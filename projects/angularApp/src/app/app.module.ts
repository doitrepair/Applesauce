import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NetIdModule } from './net-id/net-id.module';
import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { IncidentService } from './shared/services/incident.service';
import { AcmeService } from './shared/services/acme.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    NetIdModule,
    RoutingModule,
    FormsModule
  ],
  providers: [
    IncidentService,
    AcmeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
