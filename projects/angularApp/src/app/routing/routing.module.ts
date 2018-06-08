import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'net', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full'}
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
