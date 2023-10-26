import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  public URL_API = environment.base_url;

  constructor(private http: HttpClient) { }

  get getToken() {
    return localStorage.getItem('token') || '';
  }

  get getHeaders() {
    return {
      headers: { 'x-token': this.getToken }
    }
  }

  search(
    type: 'users' | 'hospitals' | 'doctors',
    term: string
  ) {
    return this.http.get(`${this.URL_API}/all/collection/${type}/${term}`, this.getHeaders)
      .pipe(
        map((response: any) => {

          switch (type) {
            case 'users':
              return this.transformUsers(response.data);

            default:
              return [];
          }

        })
      );
  }

  transformUsers(results: any[]): User[] {
    return results.map((user) => new User(
      user.name, user.email, '',
      user.isGoogleAccount, user.img, user.role,
      user.uid
    ));
  }

}
