import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementerComponent } from './incrementer/incrementer.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';
import { NgChartsModule } from 'ng2-charts';
import { ModalImgComponent } from './modal-img/modal-img.component';


@NgModule({
  declarations: [
    IncrementerComponent,
    DonutComponent,
    ModalImgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports:[
    IncrementerComponent,
    DonutComponent,
    ModalImgComponent
  ]
})
export class ComponentsModule { }
