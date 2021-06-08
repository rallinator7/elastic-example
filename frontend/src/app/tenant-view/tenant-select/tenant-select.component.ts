import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY} from '@angular/cdk/scrolling';
import { Tenant } from './../../proto/tenant_pb'
import {TenantService} from '../services/tenant.service';
import { TenantViewService } from '../services/tenant-view.service';
import {Observable} from "rxjs";

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
  constructor() {
    super(50, 250, 500);
  }
}

@Component({
  selector: 'app-tenant-select',
  templateUrl: './tenant-select.component.html',
  styleUrls: ['./tenant-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy}]
})
export class TenantSelectComponent implements OnInit {

  constructor(private tenantService: TenantService, private tenantViewService: TenantViewService) { }
  tenants: Tenant[] = [];

  ngOnInit() {
    this.getTenants()
  }


  getTenants(): void {
    this.tenantService.getTenants()
      .subscribe(tenants => this.tenants = tenants);
    console.log(this.tenants)
  }

  changeToCreate() {
    this.tenantViewService.setTenantView('create');
  }
}
