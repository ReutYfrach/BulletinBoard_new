import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Ad {
  id: number;
  title: string;
  description: string;
  category: string;
  creator: string;
  createdAt: string;
  phone: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AdsService {

  private apiUrl = `${environment.apiBaseUrl}/api/ads`;

  constructor(private http: HttpClient) { }

  getAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(this.apiUrl);
  }

  addAd(ad: Ad): Observable<Ad> {
    return this.http.post<Ad>(this.apiUrl, ad, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteAd(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateAd(ad: Ad): Observable<Ad> {
    return this.http.put<Ad>(`${this.apiUrl}/${ad.id}`, ad);
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload-image`, formData);
  }
}
