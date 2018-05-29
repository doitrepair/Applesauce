import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { SharedModule } from '../shared.module';
import { IShift } from './shift';

@Injectable({
  providedIn: 'root'
})
export class AcmeService {
  private shifts: IShift[];

  private acmeUrl: 'http://localhost:8080/api/schedule';
  private headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(private http: HttpClient) { }

  // Looks up all the shifts for a given shift_id (ex: shift_id 70 coresponds to the Dayton Column and shift_id 64 corresponds to the Appt column) within a specified date range
  getShiftsByDateRange(beginDate: Date, endDate: Date, shift_id: number) {
    const params = {
      // the Date's toISOString method returns a string of the date in the ISO format
      //  - ex: '2018-01-01T00:00.000Z'
      // we then call the string split function with the separator of 'T'
      //  - ex: ['2018-01-01', '00:00.000Z']
      // Lastly, we take the 0 element of the array to get the date
      //  - ex: '2018-01-01'
      'begin': beginDate.toISOString().split('T')[0],
      'end': endDate.toISOString().split('T')[0],
      'shift_id': shift_id
    }
    console.log(JSON.stringify(params))
    return this.http.post<IShift[]>(this.acmeUrl, params, {headers: this.headers}).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  // Changes a shift to be an appt shift given a specified timeslot (ex '9:00' or '14:30'), the date and the first and last name of the agent).
  updateProduct(timeslot: string, date: Date, netid:string): Observable<any> {
    const params = {
      // Must be HH:MM format (military time)
      'timeslot': timeslot,
      // See comment for similar lines in getShiftsByDateRange function for how this date conversion works
      'date': date.toISOString().split('T')[0],
      'netid': netid
    }
    return this.http.put<any>(this.acmeUrl, params, { headers: this.headers}).pipe(
      tap(data => console.log(JSON.stringify(data))),  catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<Error> {
      // Log the error to the console
      let errorMessage: string;
      if (err.error instanceof Error) {
          // Client-side or network error
          errorMessage = `An error occurred: ${err.error.message}`;
      } else {
          // The backend returned an unsuccessful response code
          errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
      }
      // Log error and return instance of error observable
      //console.error(err);
      return throwError(errorMessage);
  }
}
