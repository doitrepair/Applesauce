import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-description-step',
  templateUrl: './description-step.component.html',
  styleUrls: ['./description-step.component.css']
})
export class DescriptionStepComponent {
  @Output() goToNext = new EventEmitter<boolean>();

  constructor() { }

  public description: string;

  continue(): void {
    console.log("Continue Pressed In Child");
    console.log("Description set to " + this.description);
    //IncidentService.incident.description = description;
    this.goToNext.emit(true);
  }
}
