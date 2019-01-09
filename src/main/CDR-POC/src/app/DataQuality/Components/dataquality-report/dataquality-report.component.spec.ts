import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataqualityReportComponent } from './dataquality-report.component';

describe('DataqualityReportComponent', () => {
  let component: DataqualityReportComponent;
  let fixture: ComponentFixture<DataqualityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataqualityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataqualityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
