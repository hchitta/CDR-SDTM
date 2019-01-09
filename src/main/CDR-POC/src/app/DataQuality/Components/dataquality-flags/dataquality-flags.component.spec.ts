import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataqualityFlagsComponent } from './dataquality-flags.component';

describe('DataqualityFlagsComponent', () => {
  let component: DataqualityFlagsComponent;
  let fixture: ComponentFixture<DataqualityFlagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataqualityFlagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataqualityFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
