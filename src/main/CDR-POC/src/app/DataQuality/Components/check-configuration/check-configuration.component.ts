import { Component, OnInit } from '@angular/core';
import { CheckconfigService } from '../../Services/checkconfig.service';
import { JobItem } from '../../Model/JobItem';
import { UserService } from '../../../SDTM/Services/user.service';

@Component({
  selector: 'check-configuration',
  templateUrl: './check-configuration.component.html',
  styleUrls: ['./check-configuration.component.css']
})
export class CheckConfigurationComponent implements OnInit {
  public domainStatuses: any[];
  public popupType: any;
  public jobItem: JobItem;
  appName: string;
  configTypeIcons: Object[];
  configTypeImage: string;
  configTypeTitle: string;
  statusShowOptions = false;
  statusDrpSelected = false;
  studyDrpSelected = false;
  studyShowOptions = false;
  categoryDrpSelected = false;
  categoryShowOptions = false;
  checkDrpSelected = false;
  checkShowOptions = false;
  formDrpSelected = false;
  formshowOptions = false;
  therapeuticAreaDrpSelected = false;
  therapeuticAreasShowOptions = false;
  variableShowOptions = false;
  variableDrpSelected = false;
  public therapeuticAreas: any[];
  public studyTitles: any[];
  public studyCategory: any[];
  public studyCheck: any[];
  public studyStatus: any[];
  public form: any[];
  public variables: any[];
  public searchDqChecks: any = {};
  isAdminUser = false;
  dqJobs: JobItem[] = [];

  constructor(private checkConfigService: CheckconfigService, private userService: UserService) { }
  ngOnInit() {

    const userDetails = this.userService.getUser();
        if (userDetails !== undefined && userDetails.userName === 'admin') {
            this.isAdminUser = true;
        }

    this.checkConfigService.getJobs().subscribe(jobs => this.dqJobs = jobs);
    this.configTypeImage = "assets/images/NewStudyConf.png";
    this.configTypeTitle = "Data Quality Checks";
    this.configTypeIcons = [
      { "icontitle": "Create New Check", "iconImageSrc": "assets/images/AddStudy.png", "action": "add", "inputParam": "" },
      { "icontitle": "Upload", "iconImageSrc": "assets/images/NewNote.png", "action": "", "inputParam": "" },
      { "icontitle": "Download", "iconImageSrc": "assets/images/studyDownload.png", "": "", "inputParam": "" },
      { "icontitle": "Refresh", "iconImageSrc": "assets/images/Refresh.png" },
      {"icontitle": "Report", "iconImageSrc": "assets/images/Email.png", "action": "report"},
      { "icontitle": "Import", "iconImageSrc": "assets/images/RightImage1.png", "action": "import" } 

    ];
    this.appName = "Data Quality";

    this.checkConfigService.fetchDomainStatuses().subscribe(data => {
      this.domainStatuses = data;
    });
    this.checkConfigService.fetchTherapeuticAreas().subscribe(data => {
      this.therapeuticAreas = data;
    });
    this.checkConfigService.fetchStudyTitles().subscribe(data => {
      this.studyTitles = data;
    });
    this.checkConfigService.fetchStudyCategory().subscribe(data => {
      this.studyCategory = data;
    });
    this.checkConfigService.fetchStudyCheck().subscribe(data => {
      this.studyCheck = data;
    });
    this.checkConfigService.fetchStatus().subscribe(data => {
      this.studyStatus = data;
    });
    this.checkConfigService.fetchForm().subscribe(data => {
      this.form = data;
    });
  }


  addHandlerIconClick(data) {
    if (!data.flag) {
      return;
    } else {
      this.addHandler(data.flag);
    }
   }

   public addHandler(flag: any) {
    this.jobItem = new JobItem();
    this.popupType = flag;
   }

   public cancelHandler() {
    this.jobItem = undefined;
   }

   public importHandler(template: JobItem) {
    this.jobItem = undefined;
   }

   public saveHandler(template: JobItem) {
    this.jobItem = undefined;
   }

   public updateHandler(template: JobItem) {
    this.jobItem = undefined;
   }

   public downloadHandler(template: JobItem) {
    this.jobItem = undefined;
   }

   public emailHandler(template: JobItem) {
    this.jobItem = undefined;
   }

   public editHandler({ dataItem }) {
    this.jobItem = dataItem;
    this.popupType = 'edit';
   }

   public removeHandler({ dataItem }) {
      this.jobItem = dataItem;
      this.popupType = 'delete';
    }

    public deleteHandler(template: JobItem) {
        this.jobItem = undefined;
    }

    public flagHandler(template: JobItem) {
      this.jobItem = undefined;
    }

  public noteHandler(template: JobItem) {
    this.jobItem = undefined;
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
public studyDrp(): void {
  if (this.studyDrpSelected === false) {
      this.studyShowOptions = true;
      this.studyDrpSelected = true;
  } else {
      this.studyShowOptions = false;
      this.studyDrpSelected = false;
  }
}
public categoryDrp(): void {
  if (this.categoryDrpSelected === false) {
      this.categoryShowOptions = true;
      this.categoryDrpSelected = true;
  } else {
      this.categoryShowOptions = false;
      this.categoryDrpSelected = false;
  }
}
public checkDrp(): void {
  if (this.checkDrpSelected === false) {
      this.checkShowOptions = true;
      this.checkDrpSelected = true;
  } else {
      this.checkShowOptions = false;
      this.checkDrpSelected = false;
  }
}
public statDrp(): void {
  if (this.statusDrpSelected === false) {
      this.statusShowOptions = true;
      this.statusDrpSelected = true;
  } else {
      this.statusShowOptions = false;
      this.statusDrpSelected = false;
  }
}
public formDrp(): void {
  if (this.formDrpSelected === false) {
      this.formshowOptions = true;
      this.formDrpSelected = true;
  } else {
      this.formshowOptions = false;
      this.formDrpSelected = false;
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

public variableDrp(): void {
  if (this.variableDrpSelected === false) {
    this.variableShowOptions = true;
    this.variableDrpSelected = true;
  } else {
    this.variableShowOptions = false;
    this.variableDrpSelected = false;
  }
}

public filterDqChecks() {
  this.checkConfigService.filterDqChecks(this.searchDqChecks).subscribe(data => {
    this.dqJobs = data;
  });
}

public clear() {
  this.checkConfigService.fetchStudyTitles().subscribe(data => {
      this.studyTitles = data;
  });
  this.searchDqChecks = {};
  this.variables = [];
  this.studyShowOptions = false;
  this.studyDrpSelected = false;
  this.formDrpSelected = false;
  this.formshowOptions = false;
  this.categoryDrpSelected = false;
  this.categoryShowOptions = false;
  this.checkDrpSelected = false;
  this.checkShowOptions = false;
  this.variableDrpSelected = false;
  this.variableShowOptions = false;
  this.therapeuticAreaDrpSelected = false;
  this.therapeuticAreasShowOptions = false;
  this.statusShowOptions = false;
  this.statusDrpSelected = false;
  this.dqJobs = [];
}

filterStudies(therapeuticArea: any) {
  if (therapeuticArea === 'undefined') {
      // do nothing
  } else if (therapeuticArea === 'all') {
      this.checkConfigService.fetchStudyTitles().subscribe(data => {
          this.studyTitles = data;
      });
  } else {
      this.checkConfigService.fetchStudiessBytherapeuticArea(therapeuticArea).subscribe(data => {
          this.studyTitles = data;
      });
  }
}

public getVariables(table: any) {
  if (this.form != null) {
    const selectedItem = this.form.find((x: any) => x[0] === table);
    if (selectedItem) {
        this.searchDqChecks.formName = selectedItem[1];
    }
}
  this.checkConfigService.fetchVariables(table).subscribe(data => {
      this.variables = data;
  });
  }

  public getStudy(): String {
    if (this.searchDqChecks != null && this.searchDqChecks.study != null && this.searchDqChecks.form != null) {
       return this.searchDqChecks.study;
    }
   }

   public getDomain(): String {
    let selectedDomain = '';
    if (this.searchDqChecks != null && this.searchDqChecks.form != null
        && this.form != null && this.form.length > 0) {
        for (let i = 0; i < this.form.length; i++) {
            if (this.form[i][0] === this.searchDqChecks.form) {
                selectedDomain = this.form[i][1];
                break;
            }
        }
        return selectedDomain + ' Form';
    }
    return null;
}


}
