/**
 * @fileoverview gRPC-Web generated client stub for tenant
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as tenant_pb from './tenant_pb';


export class TenantServiceClient {
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
    tenant_pb.CreateResponse,
    (request: tenant_pb.CreateRequest) => {
      return request.serializeBinary();
    },
    tenant_pb.CreateResponse.deserializeBinary
  );

  create(
    request: tenant_pb.CreateRequest,
    metadata: grpcWeb.Metadata | null): Promise<tenant_pb.CreateResponse>;

  create(
    request: tenant_pb.CreateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: tenant_pb.CreateResponse) => void): grpcWeb.ClientReadableStream<tenant_pb.CreateResponse>;

  create(
    request: tenant_pb.CreateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: tenant_pb.CreateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/tenant.TenantService/Create',
        request,
        metadata || {},
        this.methodInfoCreate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/tenant.TenantService/Create',
    request,
    metadata || {},
    this.methodInfoCreate);
  }

  methodInfoGetAll = new grpcWeb.AbstractClientBase.MethodInfo(
    tenant_pb.GetAllResponse,
    (request: tenant_pb.GetAllRequest) => {
      return request.serializeBinary();
    },
    tenant_pb.GetAllResponse.deserializeBinary
  );

  getAll(
    request: tenant_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null): Promise<tenant_pb.GetAllResponse>;

  getAll(
    request: tenant_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: tenant_pb.GetAllResponse) => void): grpcWeb.ClientReadableStream<tenant_pb.GetAllResponse>;

  getAll(
    request: tenant_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: tenant_pb.GetAllResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/tenant.TenantService/GetAll',
        request,
        metadata || {},
        this.methodInfoGetAll,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/tenant.TenantService/GetAll',
    request,
    metadata || {},
    this.methodInfoGetAll);
  }

}

