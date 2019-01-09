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
      { "icontitle": "Add Study", "iconImageSrc": "assets/images/AddStudy.png", "action": "add", "inputParam": "" },
      { "icontitle": "Upload", "iconImageSrc": "assets/images/NewNote.png", "action": "", "inputParam": "" },
      { "icontitle": "Download", "iconImageSrc": "assets/images/studyDownload.png", "": "", "inputParam": "" },
      { "icontitle": "Refresh", "iconImageSrc": "assets/images/Refresh.png" }
      {"icontitle": "Email", "iconImageSrc": "assets/images/Email.png"},
      { "icontitle": "Import from Template or Library", "iconImageSrc": "assets/images/RightImage1.png", "action": "import" } 

    ];
    this.appName = "Data Quality";

    this.checkConfigService.fetchDomainStatuses().subscribe(data => {
      this.domainStatuses = data;
    });

  }

}
