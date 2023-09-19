import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Moment } from '../interfaces/Moment';

import { environment } from 'src/environments/environment';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) {}

  getMomentById(id: number): Observable<Response<Moment>> {
    return this.http.get<Response<Moment>>(`${this.apiUrl}/${id}`);
  }

  getMoments(): Observable<Response<Moment[]>> {
    return this.http.get<Response<Moment[]>>(this.apiUrl);
  }

  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  removeMoment(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  editMoment(id: number, formData: FormData): Observable<FormData> {
    return this.http.put<FormData>(`${this.apiUrl}/${id}`, formData);
  }
}
