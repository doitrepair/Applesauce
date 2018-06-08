import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ApptComponent } from '../appt/appt.component';
import { RepairComponent } from '../repair/repair.component';

const apptRoutes: Routes = [
  {
    path: 'net',
  //  canActivate: [ AuthGuard ],
  //  component: NetRoutingComponent,
    children: [
      { path: 'appt', component: ApptComponent },
      { path: 'repair', component: RepairComponent },
  //    { path: 'user', component: UserStepComponent },
  //    { path: 'device', component: DeviceStepComponent },
  //    { path: 'success', component: DeviceStepComponent },
  //    { path: 'schedule', component: CalendarStepComponent },
      { path: '**', redirectTo: 'appt', pathMatch: 'full'}
    ]
 }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(apptRoutes),
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class NetRoutingModule { }
