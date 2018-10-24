import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';

import { NetRoutingModule } from './net-routing/net-routing.module';

import { ApptComponent } from './appt/appt.component';
import { RepairComponent } from './repair/repair.component';

@NgModule({
  imports: [
    CommonModule,
    NetRoutingModule,
    MatStepperModule,
  ],

  declarations: [
    ApptComponent,
    RepairComponent,
  ],
  exports: [
  ]
})

export class NetModule { }
