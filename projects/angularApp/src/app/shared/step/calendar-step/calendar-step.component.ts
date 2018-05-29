import { Component, OnInit } from '@angular/core';
import { AcmeService } from '../../services/acme.service';
import { IShift } from '../../services/shift';

@Component({
  selector: 'app-calendar-step',
  templateUrl: './calendar-step.component.html',
  styleUrls: ['./calendar-step.component.css']
})
export class CalendarStepComponent implements OnInit {
  errorMessage: string;

  constructor(private acmeService: AcmeService) { }

  ngOnInit() {
    const d: Date = new Date();
    console.log(d);
    this.acmeService.getShiftsByDateRange(d, d, 70).subscribe(
            (shifts: IShift[]) => { console.log(shifts); },
            (error: any) => console.log(error)
        );
  }

}
