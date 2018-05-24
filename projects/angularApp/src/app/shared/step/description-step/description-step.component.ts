import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'

import { CoreModule } from '../../../core/core.module'
import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-description-step',
  templateUrl: './description-step.component.html',
  styleUrls: ['./description-step.component.css']
})
export class DescriptionStepComponent {
  @Output() goToNext = new EventEmitter<void>();
  descriptionForm: FormGroup;
  descriptionMessage: string;

  private validationMessages = {
    description: {
      required: "Please Enter a Description of the Issue",
      maxLength: "Description Exceeds Max Length of 500 Characters"
    }
  }

  constructor(private fb: FormBuilder,
    private _incidentService: IncidentService) { }

  ngOnInit(): void {
    this.descriptionForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(500)]]
    })
  }

  setErrorMessage(c: AbstractControl, messages: any): string {
    if((c.touched || c.dirty) && c.errors){
      return Object.keys(c.errors).map( key => messages[key] ).join(' ');
    }
  }
  continue(): void {
    this._incidentService.incident.description = this.descriptionForm.get('description').value;
    console.log("Description set to " + this._incidentService.incident.description);
    this.goToNext.emit();
  }
}
