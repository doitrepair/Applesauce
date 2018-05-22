import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptHomeComponent } from './appt-home.component';

describe('ApptHomeComponent', () => {
  let component: ApptHomeComponent;
  let fixture: ComponentFixture<ApptHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApptHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApptHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
