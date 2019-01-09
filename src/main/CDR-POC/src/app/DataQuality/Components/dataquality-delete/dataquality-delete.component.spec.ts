import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataqualityDeleteComponent } from './dataquality-delete.component';

describe('DataqualityDeleteComponent', () => {
  let component: DataqualityDeleteComponent;
  let fixture: ComponentFixture<DataqualityDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataqualityDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataqualityDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
