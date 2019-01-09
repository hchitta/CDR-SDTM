
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap';
import { CheckConfigurationComponent } from './Components/check-configuration/check-configuration.component';
import { CommonModule } from '@angular/common';
import { CustomChecksComponent } from './Components/custom-checks/custom-checks.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { EditChecksComponent } from './Components/edit-checks/edit-checks.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { HttpClient,  HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ImportChecksComponent } from './Components/import-checks/import-checks.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../Shared/shared.module';
import { DataqualityHomeComponent } from './Components/dataquality-home/dataquality-home.component';
import { DataqualityReportComponent } from './Components/dataquality-report/dataquality-report.component';
import { DataqualityDeleteComponent } from './Components/dataquality-delete/dataquality-delete.component';
import { DataqualityNotesComponent } from './Components/dataquality-notes/dataquality-notes.component';
import { DataqualityFlagsComponent } from './Components/dataquality-flags/dataquality-flags.component';

@NgModule({
  imports: [
    BrowserModule,
    BsDropdownModule,
    CommonModule,
    CommonModule,
    DialogsModule,
    DropDownsModule,
    FormsModule,
    GridModule,
    HttpClientJsonpModule,
    HttpClientModule,
    HttpModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    CheckConfigurationComponent, 
    ImportChecksComponent, 
    CustomChecksComponent, 
    EditChecksComponent, DataqualityHomeComponent, DataqualityReportComponent, DataqualityDeleteComponent, DataqualityNotesComponent, DataqualityFlagsComponent]
})
export class DataQualityModule { }
