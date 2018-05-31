import { NgModule } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';

import { CoreModule } from '../core/core.module';
import { StepModule } from './step/step.module';


@NgModule({
  imports: [
    CoreModule,
    StepModule,
    MatStepperModule
  ],
  declarations: []
})
export class SharedModule { }
