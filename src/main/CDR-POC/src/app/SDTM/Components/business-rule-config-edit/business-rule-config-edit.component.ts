import { Component, Input, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';


import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Headers, RequestOptions } from '@angular/http';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { BusinessEditService } from '../../Services';
import { Matrix } from '../../Models';


@Component({
    selector: 'business-rule-config-edit',
    templateUrl: './business-rule-config-edit.component.html',
    styleUrls: ['./business-rule-config-edit.component.css']

})
export class BusinessRuleConfigEditComponent implements OnInit {

    public isImportFromStudy: boolean = false;
    public matrixStudyTitles: any[];
    public studyTitles: any[];
    public studyPopDomains: any[];
    public selectedDomains: any[];
    public searchBRStudy: any = {};
    public transPlaceHolder = 'Enter Transformation Logic';
    private businessEditService: BusinessEditService;
    public transTypes: any[];
    public lookups: any[] = [];
    public lookupVariables: any[] = [];
    public lookupTables: any[] = [];
    public sdtmVariables: any[];
    public active = false;
    public opened: boolean = false;
    public errorMsg: string;
    public defaultMessage = '';
    public override = false;
    public previousLength = 0;
    public editBusinessForm: FormGroup = new FormGroup({
        'id': new FormControl(),
        'study': new FormControl(),
        'matrixStudy': new FormControl(),
        'domain': new FormControl(),
        'importDomain': new FormControl(),
        'subDomain': new FormControl(),
        'targetFile': new FormControl(),
        'targetField': new FormControl(),
        'sourceFile': new FormControl(),
        'sourceField': new FormControl(),
        'joinLogic': new FormControl(),
        'transformation_type': new FormControl(),
        'transformation_logic': new FormControl(),
        'defaultMessage': new FormControl(),
        'formName': new FormControl(),
        'formLable': new FormControl()
    });

    constructor(private http: HttpClient, @Inject(BusinessEditService) businessEditServiceFactory: any) {
        this.businessEditService = businessEditServiceFactory();
    }
    private res: any[] = [];
    @Input() public isNew = false;
    @Input() public gridData: any;
    @Input() public domainName: any;
    @Input() public set model(matrix: Matrix) {
        this.editBusinessForm.reset(matrix);
        this.active = matrix !== undefined;
        if (this.active && matrix.transformation_type) {
            this.changePlaceholderAndValue(matrix.transformation_type);
        }
        if (this.active && matrix.formName) {
            this.onSelect(matrix.formName);
        }
        if (this.active && matrix.defaultMessage) {
            this.defaultMessage = matrix.defaultMessage;
        }
    }

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<Matrix> = new EventEmitter();
    @Output() delete: EventEmitter<Matrix> = new EventEmitter();
    @Output() fetch: EventEmitter<Matrix> = new EventEmitter();

    public onSave(e, isNew: any) {
        e.preventDefault();
        if (isNew === 'add') {
            //alert(this.editBusinessForm.value.study);
            //alert(this.editBusinessForm.value.domain);
            if (this.editBusinessForm.value.study == null || this.editBusinessForm.value.domain == null) {
                this.opened = true;
                this.errorMsg = 'Please select study and domain to add a business rule.';
            } else {
                this.save.emit(this.editBusinessForm.value);
                this.active = false;
                this.transPlaceHolder = 'Enter Transformation';
            }
        } else {
            this.save.emit(this.editBusinessForm.value);
            this.active = false;
            this.transPlaceHolder = 'Enter Transformation';
        }
    }

    public close() {
        this.opened = false;
    }

    public onCancel(e): void {
        e.preventDefault();
        this.closeForm();
    }

    private closeForm(): void {
        this.errorMsg = '';
        this.defaultMessage = '';
        this.studyPopDomains = [];
        this.previousLength = 0;
        this.transPlaceHolder = 'Enter Transformation';
        this.active = false;
        this.cancel.emit();
    }

    public onDelete(e): void {
        e.preventDefault();
        this.delete.emit(this.editBusinessForm.value);
        this.active = false;
    }

    public ngOnInit(): void {
        this.businessEditService.fetchTransformationTypes().subscribe(data => {
            this.transTypes = data;
        });
        this.businessEditService.fetchLookUpData().subscribe(data => {
            this.lookupTables = data;
        });
        this.businessEditService.fetchSDTMVariables().subscribe(data => {
            this.sdtmVariables = data;
        });
        this.businessEditService.fetchStudyTitles().subscribe(data => {
            this.studyTitles = data;
        });
        this.businessEditService.fetchMatrixStudyTitles().subscribe(data => {
            this.matrixStudyTitles = data;
        });
    }

    public changePlaceholderAndValue(value: any) {
        switch (value) {
            case 'Manual Entry': this.transPlaceHolder = 'eg: Hello World'; break;
            case 'Concatenation':
                this.transPlaceHolder = 'eg: Source_File@Source_Variable_1, Source_File@Source_Variable_2';
                break;
            case 'Upper': this.transPlaceHolder = 'eg: Source_File@Source_Variable'; break;
            case 'Lower': this.transPlaceHolder = 'eg: Source_File@Source_Variable'; break;
            case 'Minimum': this.transPlaceHolder = 'eg: Source_File@Source_Variable'; break;
            case 'Maximum': this.transPlaceHolder = 'eg: Source_File@Source_Variable'; break;
            case 'Average': this.transPlaceHolder = 'eg: Source_File@Source_Variable'; break;
            case 'Arithemetic Operation':
                this.transPlaceHolder = 'eg: Source_File@Source_Variable_1+(Source_File@Source_Variable_2/10)-9';
                break;
            case 'Number of Days': this.transPlaceHolder = 'eg: Source_File@Source_Variable_1- Source_File@Source_Variable_2'; break;
            case 'ISO Date Format': this.transPlaceHolder = 'eg: Source_File@Source_Variable'; break;
            case 'Lookup Transformation': this.transPlaceHolder = 'eg: Lookup_Type,Source_File@Source_Variable'; break;
            case 'Date Computation':
                this.transPlaceHolder = 'eg: (01/01/2018) - Source_File@Source_Variable or (CURRENTDATE)-Source_File@Source_Variable ';
                break;
            case 'No Transformation': this.transPlaceHolder = ''; break;
            case 'Sequence Generator': this.transPlaceHolder = 'eg: Source_Variable'; break;
            case 'Custom Code': this.transPlaceHolder = 'Please refer readme text for custom python code examples'; break;
            default: this.transPlaceHolder = 'Enter Transformation';
        }
    }

    public onSelect(table: any) {
        if (this.lookupTables != null) {
            const selectedItem = this.lookupTables.find((x: any) => x[0] === table);
            if (selectedItem) {
                this.editBusinessForm.value.formLable = selectedItem[1];
            }
        }
        this.businessEditService.fetchLookUpVariables(table).subscribe(data => {
            this.lookupVariables = data;
        });
    }

    public onSelectVariable(table: any) {
        if (this.lookupTables != null && this.editBusinessForm.value.formName) {
            const sourceForm = this.lookupTables.find((x: any) => x[0] === this.editBusinessForm.value.formName);
            if (sourceForm) {
                this.editBusinessForm.value.formLable = sourceForm[1];
            }
        }
        if (this.lookupVariables != null) {
            const selectedItem = this.lookupVariables.find((x: any) => x.fieldName === table);
            if (selectedItem) {
                this.editBusinessForm.value.sourceField = selectedItem['fieldDesc'];
            }
        }
    }

    filterDomains(studyTitle: any) {
        this.studyPopDomains = [];
        if (studyTitle !== 'undefined') {
            this.businessEditService.fetchDomainsByStudy(studyTitle).subscribe(data => {
                this.studyPopDomains = data;
            });
        }
    }

    public fetchTemplate(): void {
        const checkUrl = '/api/CDR/matrix/checkOverride';
        const study = this.editBusinessForm.value.study;
        const matrixStudy = this.editBusinessForm.value.matrixStudy;
        let domains = [];
        this.selectedDomains = this.editBusinessForm.value.importDomain;
        for (let i = 0; i < this.selectedDomains.length; i++) {
            domains.push(this.selectedDomains[i].domain);
        }
        if (!this.override) {
            this.previousLength = this.selectedDomains.length;
        }
        if (this.previousLength !== this.selectedDomains.length) {
            this.override = false;
        }
        const url = `${checkUrl}/${study}/${matrixStudy}/${domains}`;
        this.http.get<any[]>(url).subscribe(res => {
            if (study != null && matrixStudy != null && study === matrixStudy) {
                this.opened = true;
                this.errorMsg = 'New study and template study should not be the same. Please select another template';
            } else if (res != null && res.length > 0 && !(this.override)) {
                let commaDomains = [];
                for (let i = 0; i < res.length; i++) {
                    for (let j = 0; j < this.studyPopDomains.length; j++) {
                        if (res[i] === this.studyPopDomains[j].domain) {
                            commaDomains.push(this.studyPopDomains[j].domainLabel);
                            break;
                        }
                    }
                }
                this.opened = true;
                this.override = true;
                this.previousLength = this.selectedDomains.length;
                this.errorMsg = 'Business rules have already been configured for ' + commaDomains + ' domains for ' + study +
                    ' study and clicking submit will replace these existing business rules. Please review and de-select any domains you do not want to override';
            } else {
                this.fetch.emit(this.editBusinessForm.value);
                this.active = false;
                this.errorMsg = '';
                this.defaultMessage = '';
                this.studyPopDomains = [];
                this.override = false;
                this.previousLength = 0;
            }
        });
    }
}

