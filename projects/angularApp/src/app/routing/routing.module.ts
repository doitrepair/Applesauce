import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreModule } from '../core/core.module';

import { HomeComponent } from '../home/home.component'
import { NetIdHomeComponent } from '../net-id/net-id-home/net-id-home.component';


const appRoutes: Routes = [
  { path: 'net', component: NetIdHomeComponent, pathMatch: 'full' },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
 imports: [
   CoreModule,
   RouterModule.forRoot(
     appRoutes
     //{ enableTracing: !environment.production }
   )
 ],
 exports: [
   RouterModule
 ]
})
export class RoutingModule { }
