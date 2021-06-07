import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantViewService {
  private tenantView = new Subject<string>();
  
  tenantViewObserver$ = this.tenantView.asObservable();

  setTenantView(view: string) {
    this.tenantView.next(view);
  }

  constructor() { }
}
