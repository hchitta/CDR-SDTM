import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators/map';
import { StudyDetails } from '../../Models';
import { EditService, UserService, BusinessEditService } from '../../Services';

@Component({
  selector: 'study-setup',
  templateUrl: './study-setup.component.html',
  styleUrls: ['./study-setup.component.css']
})
export class StudySetupComponent implements OnInit {
  public studyPhases: any[];
  public studySources: any[];
  public studyStatuses: any[];
  appName: string;
  public view: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  
  
  studyConfigImg: string;
  public userName = '';
  public studyTitles: any[];
  public formGroup: FormGroup;
  public editDataItem: StudyDetails;
  public isNew: boolean;
  public isDelete: boolean;
  public searchStudy: any = {};
  private editService: EditService;
  private businessEditService: BusinessEditService;
  paramId: string;
  therapeuticAreaDrpSelected: boolean = false;
  therapeuticAreasShowOptions: boolean = false;
  studyDrpSelected: boolean = false;
  studyShowOptions: boolean = false;
  phaseDrpSelected: boolean = false;
  phaseShowOptions: boolean = false;
  statusDrpSelected: boolean = false;
  statusShowOptions: boolean = false;
  sourceDrpSelected: boolean = false;
  sourceShowOptions: boolean = false;
  public therapeuticAreas: any[];
  configTypeIcons: Object[];
  configTypeImage: string;
  configTypeTitle: string;
  navBarItems: Object[];
  isImportFromStudy: boolean = false;
  isAdmin: boolean = false;



  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute, @Inject(EditService) editServiceFactory: any,
    @Inject(BusinessEditService) businessEditServiceFactory: any
  ) {
    this.editService = editServiceFactory();
    this.businessEditService = businessEditServiceFactory();
  }

  public ngOnInit(): void {
    this.appName = "Path to SDTM";
    this.configTypeIcons = [
      { "icontitle": "Upload", "iconImageSrc": "assets/images/NewNote.png", "action": "", "inputParam": "" },
      { "icontitle": "Download", "iconImageSrc": "assets/images/studyDownload.png", "action": "", "inputParam": "" },
      { "icontitle": "Add Study", "iconImageSrc": "assets/images/AddStudy.png", "action": "add", "inputParam": "" }

    ];
    this.navBarItems = [
      { "navBarTitle": "Home", "navBarLink": "sdtmHome" },
      { "navBarTitle": "Study Configuration", "navBarLink": "studySetup" },
      { "navBarTitle": "Business Rule Configuration", "navBarLink": "businessRules" },
      { "navBarTitle": "Job Execution", "navBarLink": "jobExecution" }


    ];
    this.configTypeImage = "assets/images/NewStudyConf.png";
    this.configTypeTitle = "Study Setup";
    this.getModule();
    this.view = this.editService.pipe(map(data => process(data, this.gridState)));
    const userDetails = this.userService.getUser();
    if (userDetails !== undefined) {
      const userDetail = userDetails.firstName + ' ' + userDetails.lastName;
      this.userName = userDetail;
    } else {
      this.userName = 'Admin';
    }
    if (userDetails !== undefined && userDetails.userName === 'admin') {
      this.isAdmin = true;
    }
    this.editService.fetchStudyTitles().subscribe(data => {
      this.studyTitles = data;
    });
    this.editService.fetchTherapeuticAreas().subscribe(data => {
      this.therapeuticAreas = data;
    });
    this.editService.fetchStudyPhases().subscribe(data => {
      this.studyPhases = data;
    });
    this.editService.fetchStudySources().subscribe(data => {
      this.studySources = data;
    });
    this.editService.fetchStudyStatuses().subscribe(data => {
      this.studyStatuses = data;
    });
    this.fetch('onLoad');
  }

  public getModule(): void {
    this.paramId = this.route.snapshot.paramMap.get('id');
  }

  public fetch(searchStudy): void {
    this.editService.read(searchStudy);
  }

  addHandlerIconClick(data) {
    if (!data.flag) return;
    this.addHandler();
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

  public sourceDrp(): void {
    if (this.sourceDrpSelected === false) {
      this.sourceShowOptions = true;
      this.sourceDrpSelected = true;
    } else {
      this.sourceShowOptions = false;
      this.sourceDrpSelected = false;
    }
  }

  public therapeuticAreaDrp(): void {
    if (this.therapeuticAreaDrpSelected === false) {
      this.therapeuticAreasShowOptions = true;
      this.therapeuticAreaDrpSelected = true;
    } else {
      this.therapeuticAreasShowOptions = false;
      this.therapeuticAreaDrpSelected = false;
    }
  }

  public clear() {
    this.searchStudy = {};
    this.studyShowOptions = false;
    this.studyDrpSelected = false;
    this.phaseShowOptions = false;
    this.phaseDrpSelected = false;
    this.statusShowOptions = false;
    this.statusDrpSelected = false;
    this.sourceShowOptions = false;
    this.sourceDrpSelected = false;
    this.therapeuticAreasShowOptions = false;
    this.therapeuticAreaDrpSelected = false;
    this.filterStudies('all');
    this.editService.read('onLoad');
  }
  public onStateChange(searchStudy, state: State) {
    this.gridState = state;
    this.editService.read(searchStudy);
  }

  public addHandler() {
    this.editDataItem = new StudyDetails();
    this.isNew = true;
    this.isDelete = false;
  }

  public editHandler({ dataItem }, searchStudy) {
    this.editDataItem = dataItem;
    this.isNew = false;
    this.isDelete = false;
  }

  public cancelHandler() {
    this.editDataItem = undefined;
  }

  public saveHandler(studyDetails: StudyDetails) {
    this.editService.save(studyDetails, this.searchStudy, this.isNew);
    this.editDataItem = undefined;
  }

  public removeHandler({ dataItem }) {
    this.editDataItem = dataItem;
    this.isDelete = true;
  }

  public deleteHandler(studyDetails: StudyDetails) {
    this.editService.remove(studyDetails, this.searchStudy);
    this.editDataItem = undefined;
  }

  filterStudies(therapeuticArea: any) {
    if (therapeuticArea === 'undefined') {
      // do nothing
    } else if (therapeuticArea === 'all') {
      this.editService.fetchStudyTitles().subscribe(data => {
        this.studyTitles = data;
      });
    } else {
      this.editService.fetchStudiessBytherapeuticArea(therapeuticArea).subscribe(data => {
        this.studyTitles = data;
      });
    }
  }

  public navigateBusinessImport(dataItem: any) {
    // this.router.navigate(['/sdtmHome/businessRules', {studyTitle: dataItem.title, therapeuticArea: dataItem.therapeuticArea}]);
    this.router.navigate([`/sdtm/businessRules/${dataItem.title}/${dataItem.therapeuticArea.replace(new RegExp(/\//g), '-')}`]);
  }
}

