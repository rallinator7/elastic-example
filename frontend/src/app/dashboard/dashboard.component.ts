import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardViewService } from './services/dashboard-view.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {
  dashboardView = 'clients';

  constructor(private dashboardViewService: DashboardViewService) {
    this.dashboardViewService.dashboardViewObserver$.subscribe(
      view => {
        this.dashboardView = view;
      }
    )
  }

  ngOnInit(): void {
  }

  changeView(view: string){
    this.dashboardView = view;
  }

}
