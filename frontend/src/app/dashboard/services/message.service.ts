import { Injectable } from '@angular/core';
import {Observable, from} from 'rxjs';
import { MessageServiceClient } from "../../proto/MessageServiceClientPb";
import {
  Field,
  Message,
  CreateRequest,
  CreateResponse,
  GetAllRequest,
  GetAllResponse,
  GetAllOfTypeRequest,
  GetAllOfTypeResponse,
  SearchClientMessagesRequest,
  SearchClientMessagesResponse,
  GetMessageTypesRequest, GetMessageTypesResponse
} from "../../proto/message_pb";


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  client: MessageServiceClient;
  constructor() {
    this.client = new MessageServiceClient('http://127.0.0.1:8000', null, null);
  }

  createMessage(tenantId: string, clientId: string, type: string, fields: Field[]): Observable<Message> {
    let results: Promise<Message>;

    results = new Promise((resolve, reject) => {
      const req = new CreateRequest()
      req.setTenantid(tenantId)
      req.setClientid(clientId)
      req.setType(type)
      req.setFieldsList(fields)

      this.client.create(req, null, (err, response: CreateResponse) => {
        if (err) {
          return reject(err);
        }
        resolve(response.getMessage()!);
      });
    });

    return from(results);
  }

  getAllMessages(clientId: string): Observable<Message[]> {
    let results: Promise<Message[]>;

    results = new Promise((resolve, reject) => {
      const req = new GetAllRequest()
      req.setClientid(clientId)
      this.client.getAll(req, null, (err, response: GetAllResponse) => {
        if (err) {
          return reject(err);
        }
        resolve(response.getMessagesList());
      });
    });

    return from(results);
  }

  getAllOfTypeMessages(clientId: string, type: string): Observable<Message[]> {
    let results: Promise<Message[]>;

    results = new Promise((resolve, reject) => {
      const req = new GetAllOfTypeRequest()
      req.setClientid(clientId)
      req.setType(type)
      this.client.getAllOfType(req, null, (err, response: GetAllOfTypeResponse) => {
        if (err) {
          return reject(err);
        }
        resolve(response.getMessagesList());
      });
    });

    return from(results);
  }

  searchClientMessages(clientId: string, messageContent: string): Observable<Message[]>  {
    let results: Promise<Message[]>;

    results = new Promise((resolve, reject) => {
      const req = new SearchClientMessagesRequest()
      req.setClientid(clientId)
      req.setMessagecontent(messageContent)
      this.client.searchClientMessages(req, null, (err, response: SearchClientMessagesResponse) => {
        if (err) {
          return reject(err);
        }
        resolve(response.getMessagesList());
      });
    });

    return from(results);
  }

  getMessageTypes(): Observable<string[]> {
    let results: Promise<string[]>;

    results = new Promise((resolve, reject) => {
      const req = new GetMessageTypesRequest()
      this.client.getMessageTypes(req, null, (err, response: GetMessageTypesResponse) => {
        if (err) {
          return reject(err);
        }
        resolve(response.getTypesList());
      });
    });

    return from(results);
  }
}
