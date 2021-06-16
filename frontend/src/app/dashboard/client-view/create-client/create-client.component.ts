import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ClientService } from "../../services/client.service";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {ClientViewComponent} from "../client-view.component";

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CreateClientComponent implements OnInit {
  nameForm: FormGroup;
  addressForm: FormGroup;
  contactForm: FormGroup;
  isLinear = true;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private clientService: ClientService,  public dialogRef: MatDialogRef<ClientViewComponent>,) {
    this.nameForm = this.formBuilder.group({
      name: [null, Validators.required]
    });
    this.addressForm = this.formBuilder.group({
      address: [null, Validators.required]
    });
    this.contactForm= this.formBuilder.group({
      phoneNumber: [null, Validators.required]
    });
    console.log("id: "+this.data.tenantId)
  }

  ngOnInit(): void {
  }

  createClient(){
    this.dialogRef.close();
    this.clientService.createClient(this.nameForm.value.name,this.addressForm.value.address,this.contactForm.value.phoneNumber, this.data.tenantId)
  }
}
