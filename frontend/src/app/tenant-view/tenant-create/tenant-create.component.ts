import { Component, OnInit } from '@angular/core';
import { TenantViewService } from '../services/tenant-view.service'

@Component({
  selector: 'app-tenant-create',
  templateUrl: './tenant-create.component.html',
  styleUrls: ['./tenant-create.component.css']
})
export class TenantCreateComponent implements OnInit {

  constructor(private tenantViewService: TenantViewService) { }

  ngOnInit(): void {
  }

  changeToSelect() {
    this.tenantViewService.setTenantView('select');
  }

}
