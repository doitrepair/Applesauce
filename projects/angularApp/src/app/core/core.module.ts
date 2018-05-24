import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IncidentService } from '../shared/services/incident.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [],
  providers: [IncidentService],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class CoreModule {
  constructor(private _incidentService: IncidentService) { };

}
