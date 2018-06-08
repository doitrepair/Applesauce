import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetRoutingModule } from './net-routing/net-routing.module';

import { ApptComponent } from './appt/appt.component';
import { RepairComponent } from './repair/repair.component';

@NgModule({
  imports: [
    CommonModule,
    NetRoutingModule
  ],
  declarations: [
    ApptComponent,
    RepairComponent,
  ],
  exports: [
    NetRoutingModule
  ]
})
export class NetModule { }
