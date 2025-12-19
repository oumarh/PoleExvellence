import { Injectable } from '@angular/core';
import { environnement } from '../../environnement/environnement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepreneurService {
private apiUrl = environnement.baseUrl; // lien vers ton backend

  constructor(private http: HttpClient) {}
  
   getEntrepreneur(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/entrepreneur');
  }

  getEntrepreneurById(id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/entrepreneur/' + id);
  }

  createEntrepreneur(entrepreneur: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/entrepreneur', entrepreneur);
  }

  updateEntrepreneur(id: any, entrepreneur: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/entrepreneur/' + id, entrepreneur);
  }

  deleteEntrepreneur(id: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/entrepreneur/' + id);
  }

  getEntrepreneurCount(): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/entrepreneurcount');
  }
}