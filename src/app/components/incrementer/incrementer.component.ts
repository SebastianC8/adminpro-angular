import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html'
})
export class IncrementerComponent {

  @Input() progress: number = 42;
  @Input() btnClass: string = "btn btn-primary";

  @Output() setProgress: EventEmitter<number> = new EventEmitter();

  changeValue(value: number) {

    if (this.progress >= 100 && value >= 0) {
      this.setProgress.emit(100);
      this.progress = 100;
      return;
    }

    if (this.progress <= 0 && value < 0) {
      this.setProgress.emit(0);
      this.progress = 0;
      return;
    }

    this.progress = this.progress + value;
    this.setProgress.emit(this.progress);
  }

  progressChange(valor: number) {
    if (valor >= 100) {
      this.progress = 100;
    } else if (valor <= 0) {
      this.progress = 0;
    } else {
      this.progress = valor;
    }

    this.setProgress.emit(this.progress);
  }
  
}
