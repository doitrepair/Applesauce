import { Component, OnInit } from '@angular/core';
import { AcmeService } from '../../services/acme.service';

@Component({
  selector: 'app-calendar-step',
  templateUrl: './calendar-step.component.html',
  styleUrls: ['./calendar-step.component.css']
})
export class CalendarStepComponent implements OnInit {

  constructor(private acmeService: AcmeService) { }

  ngOnInit() {
    const d = new Date();
    this.acmeService.getShiftsByDateRange(d, d, 70);
  }

}
