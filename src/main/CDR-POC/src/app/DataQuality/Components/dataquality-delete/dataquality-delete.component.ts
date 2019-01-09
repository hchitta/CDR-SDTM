import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobItem } from '../../Model/JobItem';

@Component({
  selector: 'dq-dataquality-delete',
  templateUrl: './dataquality-delete.component.html',
  styleUrls: ['./dataquality-delete.component.css']
})
export class DataqualityDeleteComponent implements OnInit {

  public active = false;
  public opened = false;
  public errorMsg: string;
  public dqDeleteForm: FormGroup = new FormGroup({
    'study': new FormControl(),
    'form': new FormControl(),
    'category': new FormControl(),
    'check': new FormControl(),
    'variable': new FormControl(),
    'length': new FormControl(),
    'checkEnable': new FormControl()
});

@Input() public popupType;

@Input() public set model(jobItem: JobItem) {
    this.dqDeleteForm.reset(jobItem);
    this.active = jobItem !== undefined && this.popupType === 'delete';
}

@Output() cancel: EventEmitter<any> = new EventEmitter();
@Output() delete: EventEmitter<any> = new EventEmitter();

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

public onDelete(e): void {
  e.preventDefault();
  this.delete.emit(this.dqDeleteForm.value);
  this.active = false;
}

}
