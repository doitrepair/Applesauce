import { Component, OnInit } from '@angular/core';

import { IncidentService } from '../../services/incident.service';
import { ICalendarItem } from './calendar-item';

@Component({
  selector: 'app-calendar-step',
  templateUrl: './calendar-step.component.html',
  styleUrls: ['./calendar-step.component.css']
})
export class CalendarStepComponent implements OnInit {
  errorMessage: string;
  shifts: any[];
  thisWeek: any[];
  nextWeek: any[];
  thisWeekDisplayed: boolean = true;

  constructor(private IncidentService: IncidentService) { }

  // MATT TODO:
  // Matt, I finished most of the logic for the calendar item, here is what you will need to do
  // Prelude: Read these comments, then explore through my new code to try to see what I was doing, then read the comments again
  // First off, I wasn't able to figure out how to correctly format the table for the calendar (this is probably just me being tired and not seeing the obvious though), so that needs to be finished
  // Secondly, use the console.log in the onSubmitted function to test to make sure that all the buttons are working correctly in the calendar-items
  // Then, we'll need to move onto the services so that we can actually correctly handle the submit of a case

  // NOTICE: in acme.service, I changed the URL to 'localhost:8080/api/schedule', this should actually only be '/api/schedule', but specifying it like this allows us to use ng serve (as long as a nodemon server.js is also running in the background)
  // Make sure that you eventually change this back to just '/api/schedule'.
  // Long-term, I think that we can specify this kind of thing using environments so that it doesnt have to change back and forth

  ngOnInit() {
    this.IncidentService.getTwoWeekSchedule().subscribe(
            (shifts: any[]) => {
              this.shifts = Object.values(shifts);
              console.log(this.shifts);
              this.thisWeek = this.shifts.splice(0,4);
              this.nextWeek = this.shifts.splice(7,11);
            },
            (error: any) => console.log(error)
        );
  }

  toggleWeek(){
    this.thisWeekDisplayed = !this.thisWeekDisplayed;
  }

  generateDate(ISOString: string){
    return new Date(ISOString);
  }

  onSubmitted(calendarItem: ICalendarItem){
    console.log(JSON.stringify(calendarItem));
  }

}
