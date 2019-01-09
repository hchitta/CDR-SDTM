import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataqualityNotesComponent } from './dataquality-notes.component';

describe('DataqualityNotesComponent', () => {
  let component: DataqualityNotesComponent;
  let fixture: ComponentFixture<DataqualityNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataqualityNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataqualityNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
