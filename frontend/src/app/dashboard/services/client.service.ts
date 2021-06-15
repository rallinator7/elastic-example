import { Injectable } from '@angular/core';
import {Observable, from} from 'rxjs';
import { ClientServiceClient } from "../../proto/ClientServiceClientPb";
import {
  GetRequest,
  GetResponse,
  NameSearchRequest,
  NameSearchResponse,
  CreateRequest,
  CreateResponse,
  Client, NameSearchResult, GetAllResponse
} from "../../proto/client_pb";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientService: ClientServiceClient;

  constructor() {
    this.clientService = new ClientServiceClient('http://127.0.0.1:8000', null, null);
  }

  searchClients(name: string, tenantId: string): Observable<NameSearchResult[]> {
    let results: Promise<NameSearchResult[]>;
    results = new Promise((resolve, reject) => {
      const req = new NameSearchRequest()
      req.setName(name)
      req.setTenantid(tenantId)
      this.clientService.nameSearch(req, null, (err, response: NameSearchResponse) => {
        if (err) {
          return reject(err);
        }
        resolve(response.getClientsList());
      });
    });
    const observable = from(results);
    return observable;
  }

  createClient(name: string, address: string, phoneNumber: string, tenantId: string): Observable<Client> {
    let client: Promise<Client>;

    client = new Promise((resolve, reject) => {
      const req = new CreateRequest()
      req.setName(name)
      req.setTenantid(tenantId)
      req.setAddress(address)
      req.setPhonenumber(phoneNumber)
      this.clientService.create(req, null, (err, response: CreateResponse) => {
        if (err) {
          return reject(err);
        }
        resolve(response.getClient()!);
      });
    });

    const observable = from(client);
    return observable;
  }

  getAllClients(tenantId: string): Observable<Client[]> {
    let results: Promise<Client[]>;
    results = new Promise((resolve, reject) => {
      const req = new NameSearchRequest()
      req.setTenantid(tenantId)
      this.clientService.getAll(req, null, (err, response: GetAllResponse) => {
        if (err) {
          return reject(err);
        }
        resolve(response.getClientsList());
      });
    });
    const observable = from(results);
    return observable;
  }

  getClient(id: string): Observable<Client> {
    let client: Promise<Client>;

    client = new Promise((resolve, reject) => {
      const req = new GetRequest()
      req.setId(id)
      this.clientService.get(req, null, (err, response: GetResponse) => {
        if (err) {
          return reject(err);
        }
        resolve(response.getClient()!);
      });
    });

    const observable = from(client);
    return observable;
  }

}
