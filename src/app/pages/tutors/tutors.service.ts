import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TutorService {
  private apiUrl = 'https://test.worldsacross.com/api/tutors';

  constructor(private http: HttpClient) {}

  getTutors(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getTutor(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createTutor(tutorData: any): Observable<any> {
    return this.http.post(this.apiUrl, tutorData);
  }

  updateTutor(id: number, tutorData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, tutorData);
  }

  deleteTutor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
