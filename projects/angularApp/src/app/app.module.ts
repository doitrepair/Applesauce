import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './app.component';
//import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
  //  HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    RoutingModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
