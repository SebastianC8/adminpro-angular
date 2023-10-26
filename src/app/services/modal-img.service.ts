import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalImgService {

  private _hiddeModal: boolean = true;
  public type!: 'users' | 'hospitals' | 'doctors';
  public id: string = '';
  public img?: string;
  public API_URL = environment.base_url;
  // property to notify when the image has been charged
  public imgHasChanged: EventEmitter<string> = new EventEmitter<string>;

  constructor() { }

  get hiddeModal() {
    return this._hiddeModal;
  }

  openModal(
    type: 'users' | 'hospitals' | 'doctors',
    id: string,
    img = 'x'
  ) {
    this._hiddeModal = false;
    this.type = type;
    this.id = id;
    this.img = img;

    if (this.img.includes('https')) {
      this.img = this.img;
    } else {
      this.img = `${this.API_URL}/upload/${type}/${img}`;
    }

  }

  closeModal() {
    this._hiddeModal = true;
  }

}
