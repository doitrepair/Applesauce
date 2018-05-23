import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { ApptModule } from './appt/appt.module';

import { NetIdHomeComponent } from './net-id-home/net-id-home.component';

@NgModule({
  imports: [
    CoreModule,
    ApptModule
  ],
  declarations: [NetIdHomeComponent]
})
export class NetIdModule { }
