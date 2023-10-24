import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  public URL_API = environment.base_url;

  constructor() { }

  async updateImg(
    file: File,
    type: 'users' | 'hospitals' | 'doctors',
    id: string
  ) {
    try {
      const url = `${this.URL_API}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('img', file);

      const request = await fetch(url, {
        method: 'PUT',
        headers: { 'x-token': this.getToken },
        body: formData
     });

     const response = await request.json();
     
     if (response.ok) {
      return response.filename;
    } else {
      return false;
    }

    } catch (error) {
      console.log(error);
      return false;
    }
  }

  get getToken() {
    return localStorage.getItem('token') || '';
  }

}
