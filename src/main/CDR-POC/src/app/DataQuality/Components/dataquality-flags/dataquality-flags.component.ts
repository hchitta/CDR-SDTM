import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobItem } from '../../Model/JobItem';

@Component({
  selector: 'dq-dataquality-flags',
  templateUrl: './dataquality-flags.component.html',
  styleUrls: ['./dataquality-flags.component.css']
})
export class DataqualityFlagsComponent implements OnInit {

  public active = false;
  public opened = false;
  public errorMsg: string;
  public dqFlagForm: FormGroup = new FormGroup({
    'study': new FormControl(),
    'form': new FormControl(),
    'category': new FormControl(),
    'check': new FormControl(),
    'variable': new FormControl(),
    'length': new FormControl(),
    'checkEnable': new FormControl(),
    'notes': new FormControl(),
    'checkFlag': new FormControl(),
});

@Input() public popupType;

@Input() public set model(jobItem: JobItem) {
    this.dqFlagForm.reset(jobItem);
    this.active = jobItem !== undefined && this.popupType === 'flags';
}

@Output() cancel: EventEmitter<any> = new EventEmitter();
@Output() flag: EventEmitter<any> = new EventEmitter();

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

public onFlag(e): void {
  e.preventDefault();
  this.flag.emit(this.dqFlagForm.value);
  this.active = false;
}

}
