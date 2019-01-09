import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobItem } from '../../Model/JobItem';

@Component({
  selector: 'dq-custom-checks',
  templateUrl: './custom-checks.component.html',
  styleUrls: ['./custom-checks.component.css']
})
export class CustomChecksComponent implements OnInit {

            public categories: any[];
            public checks: any[];
            public variables: any[];
            public active = false;
            public opened = false;
            public errorMsg: string;
            public dqCustomCheck: FormGroup = new FormGroup({
              'form': new FormControl(),
              'category': new FormControl(),
              'check': new FormControl(),
              'variable': new FormControl(),
              'input': new FormControl()
          });

          @Input() public popupType;

          @Input() public set model(jobItem: JobItem) {
              this.dqCustomCheck.reset(jobItem);
              this.active = jobItem !== undefined && this.popupType === 'add';
          }

          @Output() cancel: EventEmitter<any> = new EventEmitter();
          @Output() save: EventEmitter<any> = new EventEmitter();

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

          public onSave(e): void {
            e.preventDefault();
            this.save.emit(this.dqCustomCheck.value);
            this.active = false;
          }

}
