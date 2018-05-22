import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptTimeStepComponent } from './appt-time-step.component';

describe('ApptTimeStepComponent', () => {
  let component: ApptTimeStepComponent;
  let fixture: ComponentFixture<ApptTimeStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApptTimeStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApptTimeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
