import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  public URL_API = environment.base_url;

  constructor(
    private http: HttpClient
  ) { }

  get getToken() {
    return localStorage.getItem('token') || '';
  }

  get getHeaders() {
    return {
      headers: { 'x-token': this.getToken }
    }
  }

  getDoctors() {
    return this.http.get(`${this.URL_API}/doctors`, this.getHeaders)
      .pipe(
        map((response: any) => response.doctors)
      );
  }

  getDoctor(uid: string) {
    return this.http.get(`${this.URL_API}/doctors/${uid}`, this.getHeaders)
      .pipe(
        map((response: any) => response.doctor)
      );
  }

  createDoctor(doctor: { name: string, hospital: string }) {
    return this.http.post(`${this.URL_API}/doctors`, doctor, this.getHeaders);
  }

  updateDoctor(doctor: Doctor) {
    return this.http.put(`${this.URL_API}/doctors/${doctor._id}`, doctor, this.getHeaders);
  }

  deleteDoctor(_id: string) {
    return this.http.delete(`${this.URL_API}/doctors/${_id}`, this.getHeaders);
  }

}
