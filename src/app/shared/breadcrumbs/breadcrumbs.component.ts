import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public currentTitle: string = "";
  public currentTitleSubs$!: Subscription;

  constructor(private router: Router) {
    this.currentTitleSubs$ = this.getRouteData().subscribe(({ title }) => {
      this.currentTitle = title;
      document.title = title;
    });
  }

  ngOnDestroy(): void {
    this.currentTitleSubs$.unsubscribe();
  }

  getRouteData() {
    return this.router.events.pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }

}
