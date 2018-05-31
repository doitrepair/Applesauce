import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { ApptModule } from './appt/appt.module';

import { NetIdHomeComponent } from './net-id-home/net-id-home.component';
import { StepperComponent } from './stepper/stepper.component';
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [
    CoreModule,
    ApptModule,
    SharedModule
  ],
  declarations: [
    NetIdHomeComponent,
    StepperComponent
  ]
})
export class NetIdModule { }
