import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobItem } from '../../Model/JobItem';

@Component({
  selector: 'dq-import-checks',
  templateUrl: './import-checks.component.html',
  styleUrls: ['./import-checks.component.css']
})
export class ImportChecksComponent implements OnInit {

    public libraries: any[];
    public studyTitles: any[];
    public active = false;
    public opened = false;
    public errorMsg: string;
    public dqImportForm: FormGroup = new FormGroup({
      'study': new FormControl(),
      'library': new FormControl()
  });

  @Input() public popupType;

  @Input() public set model(jobItem: JobItem) {
      this.dqImportForm.reset(jobItem);
      this.active = jobItem !== undefined && this.popupType === 'import';
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() import: EventEmitter<any> = new EventEmitter();

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

  public onImport(e): void {
    e.preventDefault();
    this.import.emit(this.dqImportForm.value);
    this.active = false;
  }

}
