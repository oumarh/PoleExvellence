import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environnement } from '../../environnement/environnement';
// import { BlogPost } from '../site/blog/blog.component';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // private apiUrl = 'http://localhost:8080/PoleExcellence/article'; // lien vers ton backend
  private apiUrl = environnement.baseUrl; // lien vers ton backend

  constructor(private http: HttpClient) {}
  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/article');
  }

  getArticleById(id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/article/' + id);
  }

  createArticle(article: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/article', article);
  }

  updateArticle(id: any, article: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/article/' + id, article);
  }

  deleteArticle(id: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/article/' + id);
  }
}
