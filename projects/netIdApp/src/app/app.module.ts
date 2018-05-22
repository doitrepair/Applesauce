import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SharedModule } from '../../../assets/shared-module/shared-module.module';
import { ApptPickerFormComponent } from './appt-picker-form/appt-picker-form.component';
import { ApptHomeComponent } from './appt-home/appt-home.component';
import { DescriptionStepComponent } from './description-step/description-step.component';
import { UserStepComponent } from './user-step/user-step.component';
import { DeviceStepComponent } from './device-step/device-step.component';
import { SuccessStepComponent } from './success-step/success-step.component';
import { ApptTimeStepComponent } from './appt-time-step/appt-time-step.component';

@NgModule({
  declarations: [
    AppComponent,
    ApptPickerFormComponent,
    ApptHomeComponent,
    DescriptionStepComponent,
    UserStepComponent,
    DeviceStepComponent,
    SuccessStepComponent,
    ApptTimeStepComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    RouterModule.forRoot([
        { path: '', component: ApptHomeComponent, pathMatch: 'full' },
        { path: 'appt', component: ApptPickerFormComponent },
        { path: 'description', component: DescriptionStepComponent },
        { path: 'user', component: UserStepComponent },
        { path: 'device', component: DeviceStepComponent },
        { path: '**', redirectTo: '', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
