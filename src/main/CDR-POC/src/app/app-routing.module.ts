import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { LoginComponent } from './Shared/login/login.component';
import { HomeComponent } from './SDTM/Components/home/home.component';
import { SearchModuleComponent } from './SDTM/Components/search-module/search-module.component';
import { BusinessRuleComponent } from './SDTM/Components/business-rule/business-rule.component';
import { JobExecutionComponent } from './SDTM/Components/job-execution/job-execution.component';
import { DataQualityComponent } from './DataQuality/data-quality/data-quality.component';


const routes: Routes = [
  { path: '', component: LoginComponent } ,
  {
      path: 'home',
      component: HomeComponent,
      data: {
          breadcrumb: 'Home'
      }
    },
    {
      path: 'searchModule',
      component: SearchModuleComponent,
      data: {
            breadcrumb: 'Study'
        }
    },
    {
      path: 'busRules',
      component: BusinessRuleComponent,
      data: {
        breadcrumb: 'Business Rule Configuration'
      }
    },
    {
           path: 'busRules/:studyTitle/:therapeuticArea',
           component: BusinessRuleComponent,
            data: {
             breadcrumb: 'Business Rule Configuration'
            }
    },
    {
       path: 'job',
       component: JobExecutionComponent,
       data: {
        breadcrumb: 'Job Execution'
       }
    },
    {
      path: 'job/:studyTitle',
      component: JobExecutionComponent,
      data: {
       breadcrumb: 'Job Execution'
      }
   },
    {
      path: 'dataQuality',
      component: DataQualityComponent,
      data: {
      breadcrumb: 'Data Quality Workbench'
      }
  },
    { path: 'analytics', component: AnalyticsComponent}
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
