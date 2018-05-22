import { Injectable } from '@angular/core';
import { IIncident } from './incident';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  public incident: IIncident;

  constructor() { }
}
