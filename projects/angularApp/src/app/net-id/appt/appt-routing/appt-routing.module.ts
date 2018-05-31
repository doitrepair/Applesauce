import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreModule } from '../../../core/core.module';

import { ApptRoutingComponent } from './appt-routing.component'
import { DescriptionStepComponent } from '../../../shared/step/description-step/description-step.component';
import { UserStepComponent } from '../../../shared/step/user-step/user-step.component';
import { DeviceStepComponent } from '../../../shared/step/device-step/device-step.component';
import { SuccessStepComponent } from '../../../shared/step/success-step/success-step.component';
import { StepperComponent } from '../../stepper/stepper.component';

const apptRoutes: Routes = [
  {
    path: 'net/appt',
    component: StepperComponent
  }
];

@NgModule({
 imports: [
   CoreModule,
   RouterModule.forChild(
     apptRoutes
     //{ enableTracing: !environment.production }
   )
 ],
 exports: [
   RouterModule
 ]
})
export class ApptRoutingModule { }