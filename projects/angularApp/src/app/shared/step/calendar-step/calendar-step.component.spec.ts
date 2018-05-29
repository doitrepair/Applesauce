import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarStepComponent } from './calendar-step.component';

describe('CalendarStepComponent', () => {
  let component: CalendarStepComponent;
  let fixture: ComponentFixture<CalendarStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
