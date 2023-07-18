import { Component } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';


@Component({
  selector: 'app-graficauno',
  templateUrl: './graficauno.component.html',
  styles: [
  ]
})
export class GraficaunoComponent {

  public chartLabelsOne: string[] = ['Label one', 'Label two', 'Label three'];
  public chartDatasetsOne: ChartData<'doughnut'> = {
    labels: this.chartLabelsOne,
    datasets: [
      { data: [412, 574 , 354] }
    ]
  };

  public chartLabelsTwo: string[] = ['Label four', 'Label five', 'Label six'];
  public chartDatasetsTwo: ChartData<'doughnut'> = {
    labels: this.chartLabelsTwo,
    datasets: [
      { data: [284, 312 , 498] }
    ]
  };

  public chartLabelsThree: string[] = ['Label seven', 'Label eight', 'Label nine'];
  public chartDatasetsThree: ChartData<'doughnut'> = {
    labels: this.chartLabelsThree,
    datasets: [
      { data: [371, 122 , 684] }
    ]
  };

  public chartLabelsFour: string[] = ['Label ten', 'Label eleven', 'Label twelve'];
  public chartDatasetsFour: ChartData<'doughnut'> = {
    labels: this.chartLabelsFour,
    datasets: [
      { data: [641, 824 , 111] }
    ]
  };

}
