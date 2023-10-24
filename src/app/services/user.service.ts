import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { registerForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public URL_API = environment.base_url;
  public user!: User;

  constructor(private http: HttpClient) { }

  createUser(formData: registerForm) {
    return this.http.post(`${this.URL_API}/users`, formData).pipe(
      tap((response: any) => localStorage.setItem('token', response.token))
    );
  }

  updateProfile(formData: { name: string, email: string, role: string }) {
    
    formData = {
      ... formData,
      role: this.user.role || ''
    }

    return this.http.put(`${this.URL_API}/users/${this.getUUID}`, formData, {
      headers: { 'x-token': this.getToken }
    })
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
    return this.http.get(`${this.URL_API}/login/renewToken`, {
      headers: { 'x-token': this.getToken }
    }).pipe(
      map((response: any) => {
        const { name, email, uid, role, isGoogleAccount, img = '' } = response.user;
        this.user = new User(name, email, '', isGoogleAccount, img, role, uid);
        localStorage.setItem('token', response.token);
        return true;
      }),
      catchError((error) => of(false))
    )
  }

  get getToken() {
    return localStorage.getItem('token') || '';
  }

  get getUUID() {
    return this.user.uid || '';
  }

  logout() {
    localStorage.removeItem('token');
    google.accounts.id.revoke('scorralesintap@gmail.com', () => {
      window.location.reload();
    });
  }

}
