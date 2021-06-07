import { Component, OnInit } from '@angular/core';
import { Tenant } from './services/tenant';
import { TenantViewService } from './services/tenant-view.service'
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[TenantViewService],
  animations: [
    trigger('onCreate', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(50)
      ])
    ]),
    trigger('onSelect', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('* => void', [
        animate(50, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})

export class LoginComponent implements OnInit {
  tenants: Tenant[] = [];
  tenantView: string = 'select';

  constructor( private tenantViewService: TenantViewService) {
    this.tenantViewService.tenantViewObserver$.subscribe(
      view => {
        this.tenantView = view;
      }
    )
   }
  
  ngOnInit(): void {}

}
