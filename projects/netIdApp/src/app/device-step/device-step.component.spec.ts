import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceStepComponent } from './device-step.component';

describe('DeviceStepComponent', () => {
  let component: DeviceStepComponent;
  let fixture: ComponentFixture<DeviceStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
