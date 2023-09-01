import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubscription!: Subscription;

  constructor() {

    // this.returnObservable().pipe(retry(2))
    // .subscribe({
    //   next: (value) => console.log("Suscribe: " + value),
    //   error: (err) => console.warn("Error: " + err),
    //   complete: () => console.info("Finalizó el proceso")
    // });

    // this.returnInterval().subscribe({
    //   next: (value) => console.log("Subscribe: " + value)
    // })

    this.intervalSubscription = this.returnIntervalSubscription().subscribe(console.log)

  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  returnObservable(): Observable<number> {

    let i = -1;

    return new Observable<number>((observer) => {

      const interval = setInterval(() => {

        i++;

        // Emite el valor al subscribe()
        observer.next(i);

        if (i === 2) {
          i = 0;
          // Emite un error al subscribe()
          observer.error("404 Unauthorized");
        }

        if (i === 5) {
          clearInterval(interval);
          // Emite la finalización del proceso al subscribe()
          observer.complete();
        }

      }, 1000);

    });

  }

  returnInterval(): Observable<number> {

    // interval => setInterval en RxJS
    // pipe => transforma los valores emitidos al subscribe()
    // Dentro del pipe es importante el orden
    return interval(1000)
      .pipe(
        map((value) => value + 1), // Itera cada valor y le suma ++
        filter((value) => (value % 2) === 0), // Aplica el filtro indicado a los valores ya modificados por el map()
        take(10), // Indica la cantidad de veces que se ejecuta el proceso sobre los datos ya organizados anteriormente
      );
  }

  returnIntervalSubscription(): Observable<number> {
    return interval(1000)
      .pipe(
        map((value) => value + 1),
        filter((value) => (value % 2) === 0)
      );
  }

}
