import { Injectable } from '@angular/core';
import { environnement } from '../../environnement/environnement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = environnement.baseUrl; // lien vers ton backend

  constructor(private http: HttpClient) {}

  getFormation(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/formation');
  }

  getFormationById(id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/formation/' + id);
  }

  createFormation(formation: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/formation', formation);
  }

  updateFormation(id: any, formation: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/formation/' + id, formation);
  }

  deleteFormation(id: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/formation/' + id);
  }
}
