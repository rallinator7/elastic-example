/**
 * @fileoverview gRPC-Web generated client stub for client
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as client_pb from './client_pb';


export class ClientServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoCreate = new grpcWeb.AbstractClientBase.MethodInfo(
    client_pb.CreateResponse,
    (request: client_pb.CreateRequest) => {
      return request.serializeBinary();
    },
    client_pb.CreateResponse.deserializeBinary
  );

  create(
    request: client_pb.CreateRequest,
    metadata: grpcWeb.Metadata | null): Promise<client_pb.CreateResponse>;

  create(
    request: client_pb.CreateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: client_pb.CreateResponse) => void): grpcWeb.ClientReadableStream<client_pb.CreateResponse>;

  create(
    request: client_pb.CreateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: client_pb.CreateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/client.ClientService/Create',
        request,
        metadata || {},
        this.methodInfoCreate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/client.ClientService/Create',
    request,
    metadata || {},
    this.methodInfoCreate);
  }

  methodInfoNameSearch = new grpcWeb.AbstractClientBase.MethodInfo(
    client_pb.NameSearchResponse,
    (request: client_pb.NameSearchRequest) => {
      return request.serializeBinary();
    },
    client_pb.NameSearchResponse.deserializeBinary
  );

  nameSearch(
    request: client_pb.NameSearchRequest,
    metadata: grpcWeb.Metadata | null): Promise<client_pb.NameSearchResponse>;

  nameSearch(
    request: client_pb.NameSearchRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: client_pb.NameSearchResponse) => void): grpcWeb.ClientReadableStream<client_pb.NameSearchResponse>;

  nameSearch(
    request: client_pb.NameSearchRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: client_pb.NameSearchResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/client.ClientService/NameSearch',
        request,
        metadata || {},
        this.methodInfoNameSearch,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/client.ClientService/NameSearch',
    request,
    metadata || {},
    this.methodInfoNameSearch);
  }

  methodInfoGet = new grpcWeb.AbstractClientBase.MethodInfo(
    client_pb.GetResponse,
    (request: client_pb.GetRequest) => {
      return request.serializeBinary();
    },
    client_pb.GetResponse.deserializeBinary
  );

  get(
    request: client_pb.GetRequest,
    metadata: grpcWeb.Metadata | null): Promise<client_pb.GetResponse>;

  get(
    request: client_pb.GetRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: client_pb.GetResponse) => void): grpcWeb.ClientReadableStream<client_pb.GetResponse>;

  get(
    request: client_pb.GetRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: client_pb.GetResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/client.ClientService/Get',
        request,
        metadata || {},
        this.methodInfoGet,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/client.ClientService/Get',
    request,
    metadata || {},
    this.methodInfoGet);
  }

}

