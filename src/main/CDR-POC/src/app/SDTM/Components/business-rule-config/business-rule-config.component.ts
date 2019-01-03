import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators/map';
import { ActivatedRoute } from '@angular/router';
import { Matrix } from '../../Models';
import { BusinessEditService, UserService } from '../../Services';
import { Router } from '@angular/router';


@Component({
    selector: 'business-rule-config',
    templateUrl: './business-rule-config.component.html',
    styleUrls: ['./business-rule-config.component.css']
})
export class BusinessRuleConfigComponent implements OnInit {
    isAdminUser = false;
    configTypeImage: string;
    configTypeTitle: string;
    configTypeIcons: Object[];
    navBarItems: Object[];
    studyDrpSelected = false;
    studyShowOptions = false;
    phaseDrpSelected = false;
    phaseShowOptions = false;
    statusDrpSelected = false;
    statusShowOptions = false;
    public kendoOneShow = false;
    public kendoTwoShow = true;
    public kendoTwoHeight = 339;
    userName = '';
    results: any[];
    public therapeuticAreas: any[];
    public studyTitles: any[];
    public studyDomains: any[];
    public searchBRStudy: any = {};
    public importTemplate: any = {};
    public selectedDomains: any[];
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 50
    };
    public sortable = false;
    public editBizDataItem: Matrix;
    public isNew: any;
    private businessEditService: BusinessEditService;
    view1: Observable<GridDataResult>;
    view2: Observable<GridDataResult>;
    public statusColor: any;

    constructor(private route: ActivatedRoute,
        private userService: UserService,
        @Inject(BusinessEditService) businessEditServiceFactory: any,
        private router: Router) {
        this.businessEditService = businessEditServiceFactory();
    }
    public ngOnInit(): void {

        const userDetails = this.userService.getUser();
        if (userDetails !== undefined && userDetails.userName === 'admin') {
            this.isAdminUser = true;
        }
        this.configTypeIcons = [

            { "icontitle": "Import from Template or Library", "iconImageSrc": "assets/images/RightImage1.png", "action": "import", "inputParam": this.importTemplate },
            { "icontitle": "Upload", "iconImageSrc": "assets/images/NewNote.png", "action": "", "inputParam": "" },
            { "icontitle": "Download", "iconImageSrc": "assets/images/studyDownload.png", "action": "download", "inputParam": this.searchBRStudy },
            { "icontitle": "Add Business Rule", "iconImageSrc": "assets/images/AddStudy.png", "action": "add", "inputParam": this.searchBRStudy }
        ];
        this.navBarItems = [
            { "navBarTitle": "Home", "navBarLink": "/sdtmHome" },
            { "navBarTitle": "Study Configuration", "navBarLink": "studySetup" },
            { "navBarTitle": "Business Rule Configuration", "navBarLink": "businessRules" },
            { "navBarTitle": "Job Execution", "navBarLink": "jobExecution" }];
        this.configTypeImage = '../../../assets/images/BussRules.png';
        this.configTypeTitle = 'Business Rule Configuration';
        this.view1 = this.businessEditService.pipe(map((data) => {
            const test = data && data.length > 0 ? data[0] : data;
            return process(test, this.gridState);
        }));
        this.view2 = this.businessEditService.pipe(map((data) => {
            const test = data && data.length > 1 ? data[1] : data;
            return process(test, this.gridState);
        }));
        this.businessEditService.fetchStudyTitles().subscribe(data => {
            this.studyTitles = data;
        });
        this.businessEditService.fetchTherapeuticAreas().subscribe(data => {
            this.therapeuticAreas = data;
        });
        const title = this.route.snapshot.paramMap.get('studyTitle');
        let therapeuticArea = this.route.snapshot.paramMap.get('therapeuticArea');
        const domain = this.route.snapshot.paramMap.get('domain');
        if (domain != null && title != null) {
            if (this.configTypeIcons.length === 4) {
                this.configTypeIcons.unshift({ "icontitle": "Data Lineage", "iconImageSrc": "assets/images/DataLineage.png", "action": "lineage", "inputParam": this.searchBRStudy });
                this.configTypeIcons.unshift({ "icontitle": "Go to job execution for this study", "iconImageSrc": "assets/images/JobExeGrey.png", "action": "job", "inputParam": this.searchBRStudy });
                this.configTypeIcons.unshift({ "icontitle": "View source form join logic", "iconImageSrc": "assets/images/ObjectLevel.png", "action": "objectLevel", "inputParam": this.view1 });
            }
            this.studyDomains = this.route.snapshot.data['reqDomains'];
            this.searchBRStudy.brStudy = title;
            this.searchBRStudy.brSdtmDomain = domain;
            this.businessEditService.read(this.searchBRStudy);
        }
        if (title != null && therapeuticArea != null) {
            therapeuticArea = therapeuticArea.replace(new RegExp(/-/g), '/');
            this.studyDomains = this.route.snapshot.data['reqDomains'];
            if (this.studyDomains != null && this.studyDomains.length > 0) {
                if (this.configTypeIcons.length === 4) {
                    this.configTypeIcons.unshift({ "icontitle": "Data Lineage", "iconImageSrc": "assets/images/DataLineage.png", "action": "lineage", "inputParam": this.searchBRStudy });
                    this.configTypeIcons.unshift({ "icontitle": "Go to job execution for this study", "iconImageSrc": "assets/images/JobExeGrey.png", "action": "job", "inputParam": this.searchBRStudy });
                    this.configTypeIcons.unshift({ "icontitle": "View source form join logic", "iconImageSrc": "assets/images/ObjectLevel.png", "action": "objectLevel", "inputParam": this.view1 });
                }
                this.searchBRStudy.brStudy = title;
                this.searchBRStudy.brSdtmDomain = this.studyDomains[0].domain;
                this.businessEditService.read(this.searchBRStudy);
                this.sortable = true;
            } else {
                this.importTemplate.brStudy = title;
                this.importTemplate.therapeuticArea = therapeuticArea;
                this.importTemplate.defaultMessage = 'Business rules have not been configured for this study. Please select a template below to get started';
                this.addHandler('import', this.importTemplate);
            }
        }
    }

    public fetchTemplate(searchBRStudy): void {
        if (searchBRStudy.brSdtmDomain) {
            if (this.configTypeIcons.length === 4) {
                this.configTypeIcons.unshift({ "icontitle": "Data Lineage", "iconImageSrc": "assets/images/DataLineage.png", "action": "lineage", "inputParam": this.searchBRStudy });
                this.configTypeIcons.unshift({ "icontitle": "Go to job execution for this study", "iconImageSrc": "assets/images/JobExeGrey.png", "action": "job", "inputParam": this.searchBRStudy });
                this.configTypeIcons.unshift({ "icontitle": "View source form join logic", "iconImageSrc": "assets/images/ObjectLevel.png", "action": "objectLevel", "inputParam": this.view1 });
            }
        }
        this.sortable = true;
        this.businessEditService.read(searchBRStudy);
    }

    public onStateChange(searchBRStudy, state: State) {
        this.gridState = state;
        if (this.sortable === true) {
            this.businessEditService.read(searchBRStudy);
        }
    }

    addHandlerIconClick(data) {
        if (!data.flag) return;
        else if (data.flag === 'job') {
            this.router.navigate(['/sdtm/jobExecution', this.searchBRStudy.brStudy]);
        } else if (data.flag === 'lineage') {
            window.open("http://ec2-52-90-18-39.compute-1.amazonaws.com:8080/Lineage.html", '_blank');
        } else if (data.flag === 'download') {
            window.open("http://ec2-52-90-18-39.compute-1.amazonaws.com:8080/Tableau.html", '_blank');
        } else {
            this.addHandler(data.flag, this.searchBRStudy);
        }
    }
    public addHandler(flag: any, searchBRStudy: any) {
        this.editBizDataItem = new Matrix();
        this.editBizDataItem.study = searchBRStudy.brStudy;
        if (flag === 'add') {
        this.editBizDataItem.flag = 'N';
        }
        if (flag === 'add' || flag === 'objectLevel' || flag === 'domainStatus') {
            this.editBizDataItem.domain = searchBRStudy.brSdtmDomain;
        }
        if (flag === 'import') {
            this.editBizDataItem.defaultMessage = searchBRStudy.defaultMessage;
        }
        if (flag === 'domainStatus') {
            this.editBizDataItem.domainStatus = searchBRStudy.brdomainStatus;
        }
        this.isNew = flag;
    }

    public editHandler({ dataItem }) {
        this.editBizDataItem = dataItem;
        this.editBizDataItem.flag = 'N';
        this.isNew = 'edit';
    }

    public cancelHandler() {
        this.editBizDataItem = undefined;
        this.importTemplate = {};
    }

    public saveHandler(template: Matrix) {
        this.businessEditService.save(template, this.searchBRStudy, this.isNew);
        this.editBizDataItem = undefined;
    }

    public removeHandler({ dataItem }) {
        this.editBizDataItem = dataItem;
        this.isNew = 'delete';
    }

    public deleteHandler(template: Matrix) {
        this.businessEditService.remove(template, this.searchBRStudy);
        this.editBizDataItem = undefined;
    }

    public fetchHandler(template: Matrix) {
        let domains = [];
        this.importTemplate.study = template.study;
        this.selectedDomains = template.importDomain;
        this.studyDomains = template.importDomain;

        this.selectedDomains.sort(function (a, b) {
            const nameA = a.domainLabel.toLowerCase();
            const nameB = b.domainLabel.toLowerCase();
            if (nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        for (let i = 0; i < this.selectedDomains.length; i++) {
            domains.push(this.selectedDomains[i].domain);
        }
        this.importTemplate.domain = domains;
        this.importTemplate.matrixStudy = template.matrixStudy;
        this.searchBRStudy.brStudy = template.study;
        this.searchBRStudy.brSdtmDomain = domains[0];
        this.businessEditService.save(this.importTemplate, this.searchBRStudy, 'import');
        this.editBizDataItem = undefined;
        this.sortable = true;
        if (this.configTypeIcons.length === 4) {
            this.configTypeIcons.unshift({ "icontitle": "Data Lineage", "iconImageSrc": "assets/images/DataLineage.png", "action": "lineage", "inputParam": this.searchBRStudy });
            this.configTypeIcons.unshift({ "icontitle": "Go to job execution for this study", "iconImageSrc": "assets/images/JobExeGrey.png", "action": "job", "inputParam": this.searchBRStudy });
            this.configTypeIcons.unshift({ "icontitle": "View source form join logic", "iconImageSrc": "assets/images/ObjectLevel.png", "action": "objectLevel", "inputParam": this.view1 });
        }
    }

    filterDomains(studyTitle: any) {
        this.searchBRStudy.brSdtmDomain = undefined;
        this.businessEditService.read('clear');
        this.studyDomains = [];
        if (studyTitle !== 'undefined') {
            this.businessEditService.fetchDomainsByStudy(studyTitle).subscribe(data => {
                this.studyDomains = data;
            });
        }
    }

    filterStudies(therapeuticArea: any) {
        this.businessEditService.read('clear');
        this.studyDomains = [];
        this.searchBRStudy.brSdtmDomain = undefined;
        this.searchBRStudy.brStudy = undefined;
        if (therapeuticArea === 'undefined') {
            // do nothing
        } else if (therapeuticArea === 'all') {
            this.businessEditService.fetchStudyTitles().subscribe(data => {
                this.studyTitles = data;
            });
        } else {
            this.businessEditService.fetchStudiessBytherapeuticArea(therapeuticArea).subscribe(data => {
                this.studyTitles = data;
            });
        }
    }

    public clear() {
        this.businessEditService.fetchStudyTitles().subscribe(data => {
            this.studyTitles = data;
        });
        this.searchBRStudy = {};
        this.importTemplate = {};
        this.studyDomains = [];
        this.studyShowOptions = false;
        this.studyDrpSelected = false;
        this.phaseShowOptions = false;
        this.phaseDrpSelected = false;
        this.statusShowOptions = false;
        this.statusDrpSelected = false;
        this.businessEditService.read('clear');
        if (this.configTypeIcons.length === 7) {
            this.configTypeIcons.shift();
            this.configTypeIcons.shift();
            this.configTypeIcons.shift();
        }
        this.sortable = false;
        this.kendoOneShow = false;
        this.kendoTwoShow = true;
        this.kendoTwoHeight = 339;
    }

    public getDomain(): String {
        let selectedDomain = '';
        if (this.searchBRStudy != null && this.searchBRStudy.brSdtmDomain != null
            && this.studyDomains != null && this.studyDomains.length > 0) {
            for (let i = 0; i < this.studyDomains.length; i++) {
                if (this.studyDomains[i].domain === this.searchBRStudy.brSdtmDomain) {
                    selectedDomain = this.studyDomains[i].domainLabel;
                    break;
                }
            }
            this.view2.forEach(o => {
                for (const obj of o.data) {
                    this.searchBRStudy.brdomainStatus = obj.domainStatus;
                    this.getColor(this.searchBRStudy.brdomainStatus);
                    break;
                }
            });
            return selectedDomain + ' Domain';
        }
        return null;
    }

    public studyDrp(): void {
        if (this.studyDrpSelected === false) {
            this.studyShowOptions = true;
            this.studyDrpSelected = true;
        } else {
            this.studyShowOptions = false;
            this.studyDrpSelected = false;
        }
    }
    public phaseDrp(): void {
        if (this.phaseDrpSelected === false) {
            this.phaseShowOptions = true;
            this.phaseDrpSelected = true;
        } else {
            this.phaseShowOptions = false;
            this.phaseDrpSelected = false;
        }
    }

    public statusDrp(): void {
        if (this.statusDrpSelected === false) {
            this.statusShowOptions = true;
            this.statusDrpSelected = true;
        } else {
            this.statusShowOptions = false;
            this.statusDrpSelected = false;
        }
    }

    capitalizeFirstLetter(str) {
        let temp = str;
        if (str != null && str.length > 2) {
            temp = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
        return temp;
    }

    public getStudy(): String {
        if (this.searchBRStudy != null && this.searchBRStudy.brStudy != null && this.searchBRStudy.brSdtmDomain != null) {
           // return this.capitalizeFirstLetter(this.searchBRStudy.brStudy) + ' Study';
           return this.searchBRStudy.brStudy;
        }
    }

    public KendoGridOne() {
        this.kendoOneShow = !this.kendoOneShow;
        if (this.kendoOneShow) {
            this.kendoTwoHeight = 339;
        } else {
            this.kendoTwoHeight = 339;
        }
    }

    public KendoGridTwo() {
        this.kendoTwoShow = !this.kendoTwoShow;
    }

    public confirmDomainStaus(value: any) {
        if ((value === 'Approved' || value === 'Rejected') && !this.isAdminUser) {
            return false;
        }
        this.searchBRStudy.brdomainStatus = value;
        this.addHandler('domainStatus', this.searchBRStudy);
    }

    public getColor(status: any) {
         switch (status) {
            case 'Not Started' : this.statusColor = 'White'; break;
            case 'In Progress' : this.statusColor = 'Grey'; break;
            case 'Ready for Review' : this.statusColor = 'Yellow'; break;
            case 'Approved' : this.statusColor = 'Green'; break;
            case 'Rejected' : this.statusColor = 'Red'; break;
            default : this.statusColor = 'Blue'; break;
         }

    }

    public updateDomainStatus(template: Matrix) {
        this.businessEditService.updateDomainStatus(template, this.searchBRStudy);
        this.editBizDataItem = undefined;
    }

}

