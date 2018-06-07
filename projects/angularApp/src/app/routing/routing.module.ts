import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
//  { path: 'net', component: NetIdHomeComponent, pathMatch: 'full' },
//  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];


@NgModule({
 imports: [

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
