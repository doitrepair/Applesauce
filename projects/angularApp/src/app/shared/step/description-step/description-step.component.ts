import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-description-step',
  templateUrl: './description-step.component.html',
  styleUrls: ['./description-step.component.css']
})
export class DescriptionStepComponent {
  @Output() goToNext = new EventEmitter<void>();

  constructor(private _incidentService: IncidentService) { }

  public description = "";

  continue(): void {
    console.log("Description set to " + this._incidentService.incident.description);
    this.goToNext.emit();
  }
}
