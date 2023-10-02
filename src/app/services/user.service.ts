import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { registerForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public URL_API = environment.base_url;

  constructor(private http: HttpClient) { }

  createUser(formData: registerForm) {
    return this.http.post(`${this.URL_API}/users`, formData).pipe(
      tap((response: any) => localStorage.setItem('token', response.token))
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${this.URL_API}/login`, formData).pipe(
      tap((response: any) => localStorage.setItem('token', response.token))
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${this.URL_API}/login/google`, { token }).pipe(
      tap((response: any) => localStorage.setItem('token', response.token))
    );
  }

  checkToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${this.URL_API}/login/renewToken`, {
      headers: { 'x-token': token }
    }).pipe(
      tap((response: any) => localStorage.setItem('token', response.token)),
      map((response: any) => true),
      catchError((error) => of(false))
    )
  }

  logout() {
    localStorage.removeItem('token');
    google.accounts.id.revoke('scorralesintap@gmail.com', () => {
      window.location.reload();
    });
  }

}
