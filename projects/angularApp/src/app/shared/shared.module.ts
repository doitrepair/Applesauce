import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { StepModule } from './step/step.module';

@NgModule({
  imports: [
    CoreModule,
    StepModule
  ],
  declarations: []
})
export class SharedModule { }
