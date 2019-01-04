import { Component, OnInit } from '@angular/core';
import { SeriesLabels } from '@progress/kendo-angular-charts';
import { LegendLabels } from '@progress/kendo-angular-charts';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../Services';
import { DashboardResultItem } from '../../Models';

@Component({
  selector: 'sdtm-home',
  templateUrl: './sdtm-home.component.html',
  styleUrls: ['./sdtm-home.component.css']
})
export class SdtmHomeComponent implements OnInit {
  boxSize = 970;
  
  dashboardResults:any[] =[];
  //listStudyIds = [];
  //dashboardResultItems : dashboardResultItem[]=[];
  dashBoardData: any[] = [];
  //pieDataItem	=[];
  //pieDataItemTwo =[];
  navBarItems: Object[];
  appName: string;
  firstName: string;
  public isCollapsed = false;
  dashboardResultItemMap = new Map();
  
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
  constructor(private http: HttpClient, private userService: UserService) { }


  ngOnInit() {
    this.appName = " - Path to SDTM";
    this.navBarItems = [
      { "navBarTitle": "Home", "navBarLink": "/sdtmHome" },
      { "navBarTitle": "Study Configuration", "navBarLink": "studySetup" },
      { "navBarTitle": "Business Rule Configuration", "navBarLink": "businessRules" },
      { "navBarTitle": "Job Execution", "navBarLink": "jobExecution" }];

    this.http.get<any[]>(`/api/CDR/pathToSdtmDashBoard`).subscribe(data => {
      this.dashboardResults = data;
      this.dashBoardData = data.reduce((item, x) =>
        item.concat(item.find(y => y.studyID === x.studyID) ? [] : [x])
        , []);
    console.log("before the call ");
    this.populateGraphs();
    console.log("after the call ");
      this.boxSize = (this.boxSize * this.dashBoardData.length) + 100;
      this.setDataForAccordion();
    });
   
    
    const userDetails = this.userService.getUser();
    this.firstName = userDetails.firstName;
  }
  
  public populateGraphs(){
        console.log("inside the call ");
  		console.log("data size: "+this.dashboardResults.length);  	
		
  	    for (let item of this.dashboardResults) {
      	console.log("inside the loop ");  	    
  		console.log("printing studyids : "+item.studyID);
  		if(!(this.dashboardResultItemMap.has(item.studyID))){
  		 	console.log("new item to push"+item.studyID)
  		 	//this.listStudyIds.push(item.studyID);// all unique ids in this list
  		 	//let pieDataItem=[];
  		    //let pieDataItemTwo=[];
  		 	let pieDataItem = [
              { category: 'In Progress', value: 0 },
    	      { category: 'Ready for Review', value: 0 },
    	      { category: 'Approved', value: 0 }];
  			let pieDataItemTwo = [
    		  { category: 'Enabled', value: 0 },
    	      { category: 'Disabled', value: 0 }
  			];
  			console.log("list size beginning"+pieDataItem.length);
  			
  			pieDataItem = this.incrementCount(pieDataItem,item.domainStatus);
  			pieDataItemTwo = this.incrementCount(pieDataItemTwo,item.jobEnablementStatus);
  			
  			let dashboardResultItems = new DashboardResultItem();
  			dashboardResultItems.studyID=item.studyID;
  		    dashboardResultItems.pieData=pieDataItem;
  		    dashboardResultItems.pieDataTwo=pieDataItemTwo;
  		    
            let jobExecutionDomainDetails = [
              { category: item.jobDomainName, 
                businessRuleConfigStatus: item.domainStatus ,
                jobExecutionStatus:item.jobStatus,
                jobDisabledSatus:item.jobEnablementStatus }
             ];
            dashboardResultItems.jobExecutionDomainDetails=jobExecutionDomainDetails;
  		    
  		    this.dashboardResultItemMap.set (item.studyID ,dashboardResultItems);
  		    

  		}//if
  		else{
  		console.log("old item already in list"+item.studyID)
  		let pieDataItem=[];
  		let pieDataItemTwo=[];
  			let dashboardResultItems = this.dashboardResultItemMap.get(item.studyID);
  			pieDataItem=this.incrementCount(dashboardResultItems.pieData,item.domainStatus); 
  			pieDataItemTwo=this.incrementCount(dashboardResultItems.pieDataTwo,item.jobEnablementStatus);
  			console.log("list size beginning old"+pieDataItem.length);
  			
  			dashboardResultItems.pieData = pieDataItem;
  			dashboardResultItems.pieDataTwo = pieDataItemTwo;
  			
  			 let jobExecutionDomainDetails = [
              { category: item.jobDomainName, 
                businessRuleConfigStatus: item.domainStatus ,
                jobExecutionStatus:item.jobStatus,
                jobDisabledSatus:item.jobEnablementStatus }
             ];
            dashboardResultItems.jobExecutionDomainDetails.push(jobExecutionDomainDetails);
  			//delete old entry and insert updated values in map
  			this.dashboardResultItemMap.delete (item.studyID);
  			this.dashboardResultItemMap.set (item.studyID ,dashboardResultItems);
  			
  		}
  		
  	}//end of for
  	
  	//loop over the map and add to list which will be used to display on screen
  	/*for (let value of this.dashboardResultItemMap.values()) {
      console.log(value);
      this.dashBoardData.push(value);
	}*/
  	
  }
  
  public incrementCount(list,categoryToFind){
    let indexInList=0;
    console.log("list size"+list.length);
  	for(let item of list){
  	 if(item.category == categoryToFind){
  	 item.value = item.value+1;
  	 indexInList = list.indexOf(item); 
  	 list[indexInList]= item;
  	 break;
  	 }
  	}  
  	return list;
  }
  
  public getPieData(studyID){
   return this.dashboardResultItemMap.get(studyID).pieData;
  }
  
   public getPieDataTwo(studyID){
   return this.dashboardResultItemMap.get(studyID).pieDataTwo;
  }
  
  public setDataForAccordion() {
    let index = 0;
    for (const study of this.dashBoardData) {
      index = this.dashBoardData.indexOf(study);
      if (index === 0) {
        this.dashBoardData[index].isSectionCollapsed = true;
      } else {
        this.dashBoardData[index].isSectionCollapsed = false;
      }
      //this.dashBoardData[index].isStudySectionCollapsed = false;
    }
  }
  
  
  /*
  export interface dashboardResultItemMap {
  [key: string]: dashboardResultItem;
}*/

}
