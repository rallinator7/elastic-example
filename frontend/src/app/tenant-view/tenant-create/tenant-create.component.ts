import { Component, OnInit } from '@angular/core';
import { TenantViewService } from '../services/tenant-view.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {TenantService} from '../services/tenant.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tenant-create',
  templateUrl: './tenant-create.component.html',
  styleUrls: ['./tenant-create.component.css']
})
export class TenantCreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(private tenantViewService: TenantViewService, private formBuilder: FormBuilder, private tenantService: TenantService, public router: Router) {
    this.createForm = this.formBuilder.group({
      name: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  createTenant() {
    if (!this.createForm.valid) {
      return;
    }

    let newTenant = this.tenantService.createTenant(this.createForm.value.name).then(tenant => {
      let nav = this.router.navigate(['dashboard/'+tenant.getId()]);
    })

  }

  changeToSelect() {
    this.tenantViewService.setTenantView('select');
  }

}
