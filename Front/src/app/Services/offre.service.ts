import { Injectable } from '@angular/core';
import { environnement } from '../../environnement/environnement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreService {
private apiUrl = environnement.baseUrl; // lien vers ton backend

  constructor(private http: HttpClient) {}

  getOffre(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/offre');
  }

  getOffreById(id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/offre/' + id);
  }

  createOffre(offre: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/offre', offre);
  }

  updateOffre(id: any, offre: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/offre/' + id, offre);
  }

  deleteOffre(id: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/offre/' + id);
  }
}