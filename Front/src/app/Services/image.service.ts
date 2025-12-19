import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environnement } from '../../environnement/environnement';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private uploadUrl = environnement.PhotoUrl;

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.uploadUrl, formData, { responseType: 'text' });
  }
}
