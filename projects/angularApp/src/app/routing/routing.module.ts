import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { NetRoutingComponent } from '../net/net-routing/net-routing.component';
import { ApptComponent } from '../net/appt/appt.component';
import { RepairComponent } from '../net/repair/repair.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'net',
//  canActivate: [ AuthGuard ],
  component: NetRoutingComponent,
  children: [
    { path: 'appt', component: ApptComponent, },
    { path: '', redirectTo: 'appt', pathMatch: 'full' },
    { path: 'repair', component: RepairComponent },
    { path: '**', redirectTo: 'appt', pathMatch: 'full'}
  ]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];


@NgModule({
 imports: [
   RouterModule.forRoot(
     appRoutes
     //{ enableTracing: !environment.production }
   )
 ],
 declarations: [
   HomeComponent,
 ],
 exports: [
   RouterModule
 ]
})
export class RoutingModule { }
