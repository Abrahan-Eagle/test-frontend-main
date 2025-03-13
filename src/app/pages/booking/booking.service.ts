import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'https://test.worldsacross.com/api/booking';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getBooking(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createBooking(bookingData: any): Observable<any> {
    return this.http.post(this.apiUrl, bookingData);
  }

  updateBooking(id: number, bookingData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, bookingData);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
