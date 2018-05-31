import { NgModule } from '@angular/core';

import { CoreModule } from '../../core/core.module';
import { ApptRoutingModule } from './appt-routing/appt-routing.module';

import { ApptRoutingComponent } from './appt-routing/appt-routing.component';
import { DescriptionStepComponent } from '../../shared/step/description-step/description-step.component';
import { UserStepComponent } from '../../shared/step/user-step/user-step.component';
import { DeviceStepComponent } from '../../shared/step/device-step/device-step.component';
import { SuccessStepComponent } from '../../shared/step/success-step/success-step.component';
import { StepperComponent } from '../stepper/stepper.component';

@NgModule({
  imports: [
    CoreModule,
    ApptRoutingModule
  ],
  declarations: [
    ApptRoutingComponent
  ]
})
export class ApptModule { }
