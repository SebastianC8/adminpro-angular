import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  progressOne:number = 31;
  progressTwo:number = 16;

  get getProgressOne() {
    return `${this.progressOne}%`;
  }

  get getProgressTwo() {
    return `${this.progressTwo}%`;
  }

  /**
   * Acción a realizar después de obtener el evento emitido por el hijo
   */
  // changeValue(value: number) {
  //   this.progressOne = value;
  //   this.progressTwo = value;
  // }

}
