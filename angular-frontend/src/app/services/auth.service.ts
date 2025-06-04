import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginUrl = 'http://localhost:8000/api/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.loginUrl, { email, password });
  }

  register(email: string, password: string) {
    return this.http.post<{ message: string }>('http://localhost:8000/api/register', {
      email,
      password
    });
  }

  saveToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
  }
}
