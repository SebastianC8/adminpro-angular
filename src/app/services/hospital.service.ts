import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

interface ResponseGetHospitals {
  ok: boolean,
  hospitals: Hospital[]
}

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  public URL_API = environment.base_url;

  constructor(
    private http: HttpClient,
  ) { }

  get getToken() {
    return localStorage.getItem('token') || '';
  }

  get getHeaders() {
    return {
      headers: { 'x-token': this.getToken }
    }
  }

  getHospitals():Observable<Hospital[]> {
    return this.http.get<ResponseGetHospitals>(`${this.URL_API}/hospitals`, this.getHeaders)
    .pipe(
      map((response: ResponseGetHospitals) => response.hospitals)
    );
  }

  createHospital(name: string) {
    return this.http.post(`${this.URL_API}/hospitals`, { name }, this.getHeaders);
  }

  updateHospital(_id: string, name: string) {
    return this.http.put(`${this.URL_API}/hospitals/${_id}`, { name }, this.getHeaders);
  }

  deleteHospital(_id: string) {
    return this.http.delete(`${this.URL_API}/hospitals/${_id}`, this.getHeaders);
  }

}
