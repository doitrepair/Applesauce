import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptPickerFormComponent } from './appt-picker-form.component';

describe('ApptPickerFormComponent', () => {
  let component: ApptPickerFormComponent;
  let fixture: ComponentFixture<ApptPickerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApptPickerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApptPickerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
