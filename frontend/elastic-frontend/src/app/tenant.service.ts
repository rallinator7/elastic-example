import { Injectable } from '@angular/core';
import { Tenant, TENANTS } from './tenant';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  constructor() { }

  getTenants(): Observable<Tenant[]> {
    const tenants = of(TENANTS);
    return tenants;
  }
}
