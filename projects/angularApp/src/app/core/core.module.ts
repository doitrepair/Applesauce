import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class CoreModule {
  constructor() { };

}
