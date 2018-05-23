import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetIdHomeComponent } from './net-id-home.component';

describe('NetIdHomeComponent', () => {
  let component: NetIdHomeComponent;
  let fixture: ComponentFixture<NetIdHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetIdHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetIdHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
