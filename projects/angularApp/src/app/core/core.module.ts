import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
  ],
  exports: [
    CommonModule,
    NavbarComponent,
    FooterComponent
  ]
})
export class CoreModule {
  constructor() { };

}
