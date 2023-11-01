import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';
import { Doctor } from '../models/doctor.model';

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

            case 'hospitals':
              return this.transformHospitals(response.data);

            case 'doctors':
              return this.transformDoctors(response.data);

            default:
              return [];
          }

        })
      );
  }

  searchAtALL(term: string) {
    return this.http.get(`${this.URL_API}/all/${term}`, this.getHeaders)
  }

  private transformUsers(results: any[]): User[] {
    return results.map((user: User) => new User(
      user.name, user.email, '',
      user.isGoogleAccount, user.img, user.role,
      user.uid
    ));
  }

  private transformHospitals(results: any[]): Hospital[] {
    return results.map((hospital: Hospital) => new Hospital(
      hospital.name, hospital._id, undefined, hospital.img
    ));
  }

  private transformDoctors(results: any[]): Doctor[] {
    return results.map((doctor: Doctor) => new Doctor(
      doctor.name, doctor._id, doctor.img, doctor.user, doctor.hospital
    ))
  }

}
