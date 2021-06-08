import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardViewService {
  private dashboardView = new Subject<string>();
  
  dashboardViewObserver$ = this.dashboardView.asObservable();

  setDashboardView(view: string) {
    this.dashboardView.next(view);
  }

  constructor() { }
}
