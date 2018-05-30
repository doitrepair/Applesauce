import { Component, OnInit } from '@angular/core';

import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-calendar-step',
  templateUrl: './calendar-step.component.html',
  styleUrls: ['./calendar-step.component.css']
})
export class CalendarStepComponent implements OnInit {
  errorMessage: string;
  shifts: any;

  constructor(private IncidentService: IncidentService) { }

  ngOnInit() {
    this.IncidentService.getTwoWeekSchedule().subscribe(
            (shifts: any[]) => { console.log(shifts); },
            (error: any) => console.log(error)
        );
  }

}
