import { Injectable } from '@angular/core';
import {Observable, from} from 'rxjs';
import * as grpcWeb from 'grpc-web';
import { TenantServiceClient } from './../../proto/TenantServiceClientPb'
import {CreateRequest, CreateResponse, GetAllRequest, GetAllResponse, Tenant} from './../../proto/tenant_pb'

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  client: TenantServiceClient;
  constructor() {
    this.client = new TenantServiceClient('http://127.0.0.1:8000', null, null);
  }

  getTenants(): Observable<Tenant[]> {
    let protoTenants: Promise<Tenant[]>;
    protoTenants = new Promise((resolve, reject) => {
      const req = new GetAllRequest()
      this.client.getAll(req, null, (err, response: GetAllResponse) => {
        if (err) {
          return reject(err);
        }
        resolve(response.getTenantsList());
      });
    });
    const observable = from(protoTenants);
    return observable;
  }

  createTenant(name: string): Promise<Tenant> {
    let tenant: Promise<Tenant>;

    tenant = new Promise((resolve, reject) => {
      const req = new CreateRequest();
      req.setName(name);
      this.client.create(req, null, (err, response: CreateResponse) => {
        if (err) {
          return reject(err);
        }
        resolve(response.getTenant()!);
      });
    });

    return tenant;
  }
}
