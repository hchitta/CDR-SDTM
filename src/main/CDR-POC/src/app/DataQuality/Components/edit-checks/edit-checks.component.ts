import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobItem } from '../../Model/JobItem';

@Component({
  selector: 'dq-edit-checks',
  templateUrl: './edit-checks.component.html',
  styleUrls: ['./edit-checks.component.css']
})
export class EditChecksComponent implements OnInit {

            public categories: any[];
            public checks: any[];
            public variables: any[];
            public switches: any[];
            public active = false;
            public opened = false;
            public errorMsg: string;
            public dqEditCheck: FormGroup = new FormGroup({
              'form': new FormControl(),
              'category': new FormControl(),
              'check': new FormControl(),
              'variable': new FormControl(),
              'length': new FormControl(),
              'checkEnable': new FormControl()
          });

          @Input() public popupType;

          @Input() public set model(jobItem: JobItem) {
              this.dqEditCheck.reset(jobItem);
              this.active = jobItem !== undefined && this.popupType === 'edit';
          }

          @Output() cancel: EventEmitter<any> = new EventEmitter();
          @Output() update: EventEmitter<any> = new EventEmitter();

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

          public onUpdate(e): void {
            e.preventDefault();
            this.update.emit(this.dqEditCheck.value);
            this.active = false;
          }


}
