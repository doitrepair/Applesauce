import { Injectable } from '@angular/core';
import { IIncident } from './incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  public incident = <IIncident>{};

  constructor() {
    this.incident.description = '';
  }
}
