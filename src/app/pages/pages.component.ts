import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

/**
 * Usar funciones de archivos JS en TS
 */
declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit
{
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    customInitFunctions();
  }
}
