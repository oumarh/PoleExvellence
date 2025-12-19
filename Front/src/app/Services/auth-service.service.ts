import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environnement } from '../../environnement/environnement';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  getUserName(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      // Essayez d'extraire le nom ou l'email selon le payload du token
      return decoded.firstname || decoded.name || decoded.username || decoded.email || null;
    } catch {
      return null;
    }
  }
  private apiUrl = environnement.AuthUrl 
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient, private router: Router ) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
    return localStorage.getItem(this.tokenKey);
  }
  return null;
    
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken() || undefined;
    if (!token) return true;
    try {
      const decoded: any = jwtDecode(token);
      if (!decoded.exp) return false; // Pas d'exp, on considère valide
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch {
      return true;
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      // Si roles est un tableau d'objets { authority: 'ROLE_ADMIN' }
      if (Array.isArray(decoded.roles) && decoded.roles.length > 0) {
        // On retire le préfixe ROLE_ si présent
        return decoded.roles[0].authority.replace('ROLE_', '');
      }
      // Si roles est une string ou autre fallback
      return decoded.role || decoded["roles"] || null;
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
  
}
