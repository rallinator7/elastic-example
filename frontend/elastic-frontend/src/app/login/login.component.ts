import { Component, OnInit} from '@angular/core';
import { Tenant} from '../tenant';
import { RouterOutlet } from '@angular/router';
import {TenantService} from '../tenant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
