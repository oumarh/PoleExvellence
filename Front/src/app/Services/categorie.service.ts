import { Injectable } from '@angular/core';
import { environnement } from '../../environnement/environnement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
private apiUrl = environnement.baseUrl; // lien vers ton backend

  constructor(private http: HttpClient) {}
  getCategorie(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/categorie');
  }

  getCategorieById(id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/categorie/' + id);
  }

  createCategorie(categorie: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/categorie', categorie);
  }

  updateCategorie(id: any, categorie: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/categorie/' + id, categorie);
  }

  deleteCategorie(id: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/categorie/' + id);
  }

  getCategorieByType(type: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/type/' + type);
  }
}
