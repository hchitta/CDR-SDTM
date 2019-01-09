import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobItem } from '../../Model/JobItem';

@Component({
  selector: 'dq-dataquality-report',
  templateUrl: './dataquality-report.component.html',
  styleUrls: ['./dataquality-report.component.css']
})
export class DataqualityReportComponent implements OnInit {

  public active = false;
  public opened = false;
  public errorMsg: string;
  public dqReportForm: FormGroup = new FormGroup({
    'study': new FormControl()
});

@Input() public popupType;

@Input() public set model(jobItem: JobItem) {
    this.dqReportForm.reset(jobItem);
    this.active = jobItem !== undefined && this.popupType === 'report';
}

@Output() cancel: EventEmitter<any> = new EventEmitter();
@Output() download: EventEmitter<any> = new EventEmitter();
@Output() email: EventEmitter<any> = new EventEmitter();

constructor() { }

ngOnInit() {
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
    this.active = false;
    this.cancel.emit();
}

public onDownload(e): void {
  e.preventDefault();
  this.download.emit(this.dqReportForm.value);
  this.active = false;
}

public onEmail(e): void {
  e.preventDefault();
  this.email.emit(this.dqReportForm.value);
  this.active = false;
}

}
