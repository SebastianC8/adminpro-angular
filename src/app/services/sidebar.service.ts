import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  // menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     children: [
  //       { title: 'Main', path: '/' },
  //       { title: 'Progress Bar', path: 'progress' },
  //       { title: 'Gráficas', path: 'grafica1' },
  //       { title: 'Promesas', path: 'promises' },
  //       { title: 'RxJS', path: 'rxjs' }
  //     ]
  //   },
  //   {
  //     title: 'Maintenance',
  //     icon: 'mdi mdi-folder-lock-open',
  //     children: [
  //       { title: 'Users', path: 'users' },
  //       { title: 'Hospitals', path: 'hospitals' },
  //       { title: 'Doctors', path: 'doctors' },
  //     ]
  //   }
  // ];

  public menu = [];

  constructor() { }

  loadMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];
  }
}
