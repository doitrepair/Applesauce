import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetRoutingModule } from './net-routing/net-routing.module';

import { ApptComponent } from './appt/appt.component';

@NgModule({
  imports: [
    CommonModule,
    NetRoutingModule
  ],
  declarations: [
    ApptComponent,
  ],
  exports: [
    NetRoutingModule
  ]
})
export class NetModule { }
