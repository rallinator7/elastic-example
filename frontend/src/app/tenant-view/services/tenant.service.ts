import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import * as grpcWeb from 'grpc-web';
import { TenantServiceClient } from './../../proto/TenantServiceClientPb'
import { GetAllRequest, GetAllResponse, Tenant} from './../../proto/tenant_pb'
import {error} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  client: TenantServiceClient;
  constructor() {
    this.client = new TenantServiceClient('http://127.0.0.1:8000', null, null);
  }

  getTenants(): Observable<Tenant[]> {
    let protoTenants: Tenant[] = [];
    let req = new GetAllRequest();
    const call = this.client.getAll(req, {},
      (err: grpcWeb.Error, response: GetAllResponse) => {
        console.log(response.getTenantsList());
      });

    call.on()
  }
}
