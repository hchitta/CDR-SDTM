import { Component, OnInit } from '@angular/core';
import { SeriesLabels } from '@progress/kendo-angular-charts';
import { LegendLabels } from '@progress/kendo-angular-charts';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'sdtm-home',
  templateUrl: './sdtm-home.component.html',
  styleUrls: ['./sdtm-home.component.css']
})
export class SdtmHomeComponent implements OnInit {
  boxSize = 970;
  dashBoardData: any[] = [];
  navBarItems: Object[];
  appName: string;
  public isCollapsed = false;
  public pieData: any = [
    { category: 'In Progress', value: 20 },
    { category: 'Ready for Review', value: 11 },
    { category: 'Approved', value: 4 }
  ];
  public pieDataTwo: any = [
    { category: 'Enabled', value: 3 },
    { category: 'Disabled', value: 1 }
  ];
  public seriesData: any[] = [{
    study: 'This Study',
    domains: 35
    }];

    public seriesDataTwo: any[] = [{
      study: 'Overdue',
      domains: 3,
      color: 'red'
      },
      {
        study: 'Due in 7 Days',
        domains: 7,
        color: 'brown'
      }];

      public seriesLabels: SeriesLabels = {
      visible: true, // Note that visible defaults to false
        padding: 3,
        font: 'bold 12px Open Sans',
      };

      public seriesPieLabels: SeriesLabels = {
        visible: true, // Note that visible defaults to false
          font: 'bold 10px Open Sans',
          color: 'white',
          position: 'center',
        };

        public legendLabels: LegendLabels = {
            font: '10px Open Sans',
            color: 'black'
          };

      public hidden: any = { visible: false };
  constructor( private http: HttpClient) { }

  ngOnInit() {
    this.appName = " - Path to SDTM";
    this.navBarItems = [
      { "navBarTitle": "Home", "navBarLink": "/sdtmHome" },
      { "navBarTitle": "Study Configuration", "navBarLink": "studySetup" },
      { "navBarTitle": "Business Rule Configuration", "navBarLink": "businessRules" },
      { "navBarTitle": "Job Execution", "navBarLink": "jobExecution" }];

      this.http.get<any[]>(`/api/CDR/pathToSdtmDashBoard`).subscribe(data => {
        this.dashBoardData = data;
        this.boxSize = (this.boxSize * this.dashBoardData.length) + 100;
        this.setDataForAccordion();
      });
  }

  public setDataForAccordion () {
     let index = 0;
     for (const study of this.dashBoardData) {
       index = this.dashBoardData.indexOf(study);
      if ( index === 0 ) {
          this.dashBoardData[index].isSectionCollapsed = true;
        } else {
            this.dashBoardData[index].isSectionCollapsed = false;
          }
   		//this.dashBoardData[index].isStudySectionCollapsed = false;
     }
  }
  
}
