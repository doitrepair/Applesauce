import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../services/incident.service';

@Component({
  templateUrl: './appt-picker-form.component.html',
  styleUrls: ['./appt-picker-form.component.css'],
  providers: [IncidentService]
})
export class ApptPickerFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Itz being loaded")
  }

  onNext(): void {
    console.log("Continue Pressed In Parent")
    console.log("Description: " + IncidentService.incident);
  }

}
