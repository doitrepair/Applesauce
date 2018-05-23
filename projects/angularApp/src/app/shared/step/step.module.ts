import { NgModule } from '@angular/core';

import { CoreModule } from '../../core/core.module';

import { DescriptionStepComponent } from './description-step/description-step.component';
import { DeviceStepComponent } from './device-step/device-step.component';
import { UserStepComponent } from './user-step/user-step.component';
import { SuccessStepComponent } from './success-step/success-step.component';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [DescriptionStepComponent, DeviceStepComponent, UserStepComponent, SuccessStepComponent]
})
export class StepModule { }
