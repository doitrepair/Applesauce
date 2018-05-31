import { Injectable } from '@angular/core';

import { IIncident } from './incident';

import { SharedModule } from '../shared.module';

import { AcmeService } from './acme.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  public incident = <IIncident>{};

  constructor(private acmeService: AcmeService) {
    this.incident.description = '';
  }

  getTwoWeekSchedule() {
    // Gets the date of the Monday on or prior to today
    // (Because new Date() always generates a datetime corresponding to right now)
    var today = new Date();
    var previousMonday = this.getPreviousMonday(today);
    // Add 11 to the date (7 to get to the next monday + 4 to get to the next friday)
    // This format will correctly handle wrapping around to different months and years (ex: if previous monday is 12-31-2018, this will correctly choose 01-11-2019 as the next friday)
    var nextFriday = new Date(previousMonday.getFullYear(), previousMonday.getMonth(), previousMonday.getDate()+11);
    return this.acmeService.getShiftsByDateRange(previousMonday, nextFriday, 70);
  }

  // This function gets the date of the Monday on or prior to today
  getPreviousMonday = function(d){
    if( d.getDate()-d.getDay() > 0) {
      var n = new Date(d.getFullYear(), d.getMonth(), d.getDate()-d.getDay()+1);
      return n;
    } else {
      const previousMonth = new Date(d.getFullYear(), d.getMonth(), 0); // 0 causes wrap around to the last day of the previous month (and potentially year)
      var n = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), previousMonth.getDate()-previousMonth.getDay()+1);
      return n;
    }
  }
}
