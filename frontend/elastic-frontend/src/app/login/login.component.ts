import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY} from '@angular/cdk/scrolling';
import { Tenant} from '../tenant';
import {TenantService} from '../tenant.service';

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
  constructor() {
    super(50, 250, 500);
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy}]
})

export class LoginComponent implements OnInit {
  tenants: Tenant[] = [];
  constructor(private tenantService: TenantService) { }

  ngOnInit(): void {
    this.getTenants()
  }

  getTenants(): void {
    this.tenantService.getTenants()
      .subscribe(tenants => this.tenants = tenants);
  }

}
