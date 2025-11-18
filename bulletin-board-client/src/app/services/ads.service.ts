import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Ad {
  id?: number;
  title: string;
  description: string;
  category: string;
  creator: string;
  createdAt?: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  private apiUrl = `${environment.apiBaseUrl}/api/ads`;
  

  constructor(private http: HttpClient) { }

  getAll(): Observable<Ad[]> {
    return this.http.get<Ad[]>(this.apiUrl);
  }

  get(id: number): Observable<Ad> {
    return this.http.get<Ad>(`${this.apiUrl}/${id}`);
  }

  add(ad: Ad): Observable<Ad> {
    return this.http.post<Ad>(this.apiUrl, ad);
  }

  update(id: number, ad: Ad): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, ad);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
