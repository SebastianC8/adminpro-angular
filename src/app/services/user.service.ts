import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { registerForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { GetUsers } from '../interfaces/get-users-interface';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public URL_API = environment.base_url;
  public user!: User;

  constructor(private http: HttpClient) { }

  get getRole(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role!;
  }

  get getToken() {
    return localStorage.getItem('token') || '';
  }

  get getUUID() {
    return this.user.uid || '';
  }

  get getHeaders() {
    return {
      headers: { 'x-token': this.getToken }
    }
  }

  createUser(formData: registerForm) {
    return this.http.post(`${this.URL_API}/users`, formData).pipe(
      tap((response: any) => {
        this.saveLocalStorage(response);
      })
    );
  }

  updateProfile(formData: { name: string, email: string, role: string }) {

    formData = {
      ...formData,
      role: this.user.role || ''
    }

    return this.http.put(`${this.URL_API}/users/${this.getUUID}`, formData, this.getHeaders)
  }

  login(formData: LoginForm) {
    return this.http.post(`${this.URL_API}/login`, formData).pipe(
      tap((response: any) => {
        this.saveLocalStorage(response);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${this.URL_API}/login/google`, { token }).pipe(
      tap((response: any) => {
        this.saveLocalStorage(response);
      })
    );
  }

  checkToken(): Observable<boolean> {
    return this.http.get(`${this.URL_API}/login/renewToken`, this.getHeaders).pipe(
      map((response: any) => {
        const { name, email, uid, role, isGoogleAccount, img = '' } = response.user;
        this.user = new User(name, email, '', isGoogleAccount, img, role, uid);
        this.saveLocalStorage(response);
        return true;
      }),
      catchError((error) => of(false))
    )
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    google.accounts.id.revoke('scorralesintap@gmail.com', () => {
      window.location.reload();
    });
  }

  getUsers(from: number = 0, limit: number = 5) {
    return this.http.get<GetUsers>(`${this.URL_API}/users?from=${from}&limit=${limit}`, this.getHeaders)
      .pipe(
        map((response) => {

          const users = response.users.map((user) => new User(
            user.name, user.email, '',
            user.isGoogleAccount, user.img, user.role,
            user.uid
          ));

          return {
            users,
            total: response.total
          };

        })
      )
  }

  deleteUser(user: User) {
    return this.http.delete(`${this.URL_API}/users/${user.uid}`, this.getHeaders);
  }

  changeRole(user: User) {
    return this.http.put(`${this.URL_API}/users/${user.uid}`, user, this.getHeaders);
  }

  saveLocalStorage(response: any) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('menu', JSON.stringify(response.menu));
  }

}
