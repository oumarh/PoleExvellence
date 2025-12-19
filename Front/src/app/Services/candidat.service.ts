import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environnement } from '../../environnement/environnement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
private apiUrl = environnement.baseUrl;
  constructor(private http: HttpClient) { }

 getCandidat(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/candidat');
  }

  getCandidatById(id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/candidat/' + id);
  }

  createCandidat(candidat: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/candidat', candidat);
  }

  updateCandidat(id: any, candidat: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/candidat/' + id, candidat);
  }

  deleteCandidat(id: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/candidat/' + id);
  }

  getCandidatCount(): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/candidatcount');
  }
}
