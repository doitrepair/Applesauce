import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
//  { path: 'net', component: , pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class NetRoutingModule { }
