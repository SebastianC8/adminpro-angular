import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService
{
  
  public linkTheme = document.querySelector('#theme');

  constructor() {
    let url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href', url);
  }

  changeTheme (theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');
    links.forEach((elm: any) => {
      elm.classList.remove('working');
      const btnTheme = elm.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');
      (btnThemeUrl===currentTheme) && (elm.classList.add('working'));
    })
  }

}
