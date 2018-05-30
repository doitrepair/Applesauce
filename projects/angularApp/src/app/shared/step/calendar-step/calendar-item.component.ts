import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ICalendarItem } from './calendar-item';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.css']
})
export class CalendarItemComponent implements OnInit {
  @Input() calendarItem: ICalendarItem;

  @Output() submit = new EventEmitter<ICalendarItem>();

  chooseTimeslot(){
    this.submit.emit(this.calendarItem);
  }

  constructor() { }

  ngOnInit() {
  }

}
