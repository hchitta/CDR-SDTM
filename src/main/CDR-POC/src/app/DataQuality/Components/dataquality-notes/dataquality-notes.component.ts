import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobItem } from '../../Model/JobItem';

@Component({
  selector: 'dq-dataquality-notes',
  templateUrl: './dataquality-notes.component.html',
  styleUrls: ['./dataquality-notes.component.css']
})
export class DataqualityNotesComponent implements OnInit {

  public active = false;
  public opened = false;
  public errorMsg: string;
  public dqNoteForm: FormGroup = new FormGroup({
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
    this.dqNoteForm.reset(jobItem);
    this.active = jobItem !== undefined && this.popupType === 'note';
}

@Output() cancel: EventEmitter<any> = new EventEmitter();
@Output() note: EventEmitter<any> = new EventEmitter();

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

public onNote(e): void {
  e.preventDefault();
  this.note.emit(this.dqNoteForm.value);
  this.active = false;
}

}
