import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      children: [
        { title: 'Main', path: '/' },
        { title: 'Progress Bar', path: 'progress' },
        { title: 'Gráficas', path: 'grafica1' },
        { title: 'Promesas', path: 'promises' },
        { title: 'RxJS', path: 'rxjs' }
      ]
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      children: [
        { title: 'Users', path: 'users' },
        { title: 'Hospitals', path: 'hospitals' },
        { title: 'Doctors', path: 'doctors' },
      ]
    }
  ];

  constructor() { }
}
