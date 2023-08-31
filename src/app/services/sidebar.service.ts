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
      ]
    }
  ];

  constructor() { }
}
