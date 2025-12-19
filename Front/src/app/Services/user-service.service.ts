import { Injectable } from '@angular/core';
import { environnement } from '../../environnement/environnement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
private apiUrl = environnement.baseUrl;
  constructor(private http: HttpClient) { }

 getUser(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/user');
  }

  getUserById(id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/user/' + id);
  }

  updateUsert(id: any, user: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/user/' + id, user);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/user/' + id);
  }
}