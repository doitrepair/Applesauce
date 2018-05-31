import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { ICalendarItem } from './calendar-item';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.css']
})
export class CalendarItemComponent implements OnChanges {
  @Input() agents: string[];
  @Input() date: string;
  @Input() time: string = "14:00";

  @Output() submit = new EventEmitter<ICalendarItem>();

  datetime: Date;
  calendarItem: ICalendarItem;
  inPast: boolean = false;
  active: boolean;

  // This is the minimum number of people that are required to be in the Dayton column in order for a shift to be marked as active
  threshold: number = 3;

  constructor() { }

  ngOnChanges() {
    this.checkInPast();
    this.active = this.inPast && (this.agents.length >= this.threshold);
    this.calendarItem = {
      "agents": this.agents,
      "date": this.date,
      "time": this.time
    }
    console.log(this.time);
    // If length of this.time is 4, that means that the time is something like 8:00 or 9:00 as opposed to 12:00 and 14:00, this means that we need to append a 0
    if(this.time && this.time.length == 4){
      this.datetime = new Date("2018-01-01T0"+this.time+":00");
    } else {
      this.datetime = new Date("2018-01-01T"+this.time+":00");
    }

    console.log(this.datetime);
  }

  chooseTimeslot(){
    this.submit.emit(this.calendarItem);
  }

  checkInPast() {
    const itemYear = +this.date.split('-')[0];
    const itemMonth = +this.date.split('-')[1];
    const itemDay = +this.date.split('-')[2];
    const rightNow = new Date();
    const nowYear = rightNow.getFullYear();
    const nowMonth = rightNow.getMonth() + 1; // Months in JS are 0-11 not 1-12
    const nowDay = rightNow.getDate();

    // If item is for today or earlier, check the time;
    if((itemYear<=nowYear) && (itemMonth<=nowMonth) && (itemDay<=nowDay)) {
      const itemHour = +this.time.split(':')[0];
      const itemMinute = +this.time.split(':')[1];
      const nowHour = rightNow.getHours();
      const nowMinute = rightNow.getMinutes();

      // If the item's time is before the current time
      if((itemHour<=nowHour) && (itemMinute<=nowMinute)) {
        this.inPast = true;
      }
    }
  }

}
