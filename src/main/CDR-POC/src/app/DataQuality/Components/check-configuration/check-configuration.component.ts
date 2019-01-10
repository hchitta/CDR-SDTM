import { Component, OnInit } from '@angular/core';
import { CheckconfigService } from '../../Services/checkconfig.service';
import { JobItem } from '../../Model/JobItem';

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
  constructor(private checkConfigService: CheckconfigService) { }
  dqJobs: JobItem[] = [];
  ngOnInit() {
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

}
