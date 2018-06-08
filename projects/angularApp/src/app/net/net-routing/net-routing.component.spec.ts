import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetRoutingComponent } from './net-routing.component';

describe('NetRoutingComponent', () => {
  let component: NetRoutingComponent;
  let fixture: ComponentFixture<NetRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
