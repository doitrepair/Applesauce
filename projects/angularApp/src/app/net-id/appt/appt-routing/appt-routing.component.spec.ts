import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptRoutingComponent } from './appt-routing.component';

describe('ApptRoutingComponent', () => {
  let component: ApptRoutingComponent;
  let fixture: ComponentFixture<ApptRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApptRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApptRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
