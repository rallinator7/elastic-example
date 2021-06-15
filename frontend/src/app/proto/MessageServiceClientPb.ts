/**
 * @fileoverview gRPC-Web generated client stub for message
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as message_pb from './message_pb';


export class MessageServiceClient {
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
    message_pb.CreateResponse,
    (request: message_pb.CreateRequest) => {
      return request.serializeBinary();
    },
    message_pb.CreateResponse.deserializeBinary
  );

  create(
    request: message_pb.CreateRequest,
    metadata: grpcWeb.Metadata | null): Promise<message_pb.CreateResponse>;

  create(
    request: message_pb.CreateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: message_pb.CreateResponse) => void): grpcWeb.ClientReadableStream<message_pb.CreateResponse>;

  create(
    request: message_pb.CreateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: message_pb.CreateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/message.MessageService/Create',
        request,
        metadata || {},
        this.methodInfoCreate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/message.MessageService/Create',
    request,
    metadata || {},
    this.methodInfoCreate);
  }

  methodInfoGetAll = new grpcWeb.AbstractClientBase.MethodInfo(
    message_pb.GetAllResponse,
    (request: message_pb.GetAllRequest) => {
      return request.serializeBinary();
    },
    message_pb.GetAllResponse.deserializeBinary
  );

  getAll(
    request: message_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null): Promise<message_pb.GetAllResponse>;

  getAll(
    request: message_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: message_pb.GetAllResponse) => void): grpcWeb.ClientReadableStream<message_pb.GetAllResponse>;

  getAll(
    request: message_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: message_pb.GetAllResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/message.MessageService/GetAll',
        request,
        metadata || {},
        this.methodInfoGetAll,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/message.MessageService/GetAll',
    request,
    metadata || {},
    this.methodInfoGetAll);
  }

  methodInfoGetAllOfType = new grpcWeb.AbstractClientBase.MethodInfo(
    message_pb.GetAllOfTypeResponse,
    (request: message_pb.GetAllOfTypeRequest) => {
      return request.serializeBinary();
    },
    message_pb.GetAllOfTypeResponse.deserializeBinary
  );

  getAllOfType(
    request: message_pb.GetAllOfTypeRequest,
    metadata: grpcWeb.Metadata | null): Promise<message_pb.GetAllOfTypeResponse>;

  getAllOfType(
    request: message_pb.GetAllOfTypeRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: message_pb.GetAllOfTypeResponse) => void): grpcWeb.ClientReadableStream<message_pb.GetAllOfTypeResponse>;

  getAllOfType(
    request: message_pb.GetAllOfTypeRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: message_pb.GetAllOfTypeResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/message.MessageService/GetAllOfType',
        request,
        metadata || {},
        this.methodInfoGetAllOfType,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/message.MessageService/GetAllOfType',
    request,
    metadata || {},
    this.methodInfoGetAllOfType);
  }

  methodInfoSearchClientMessages = new grpcWeb.AbstractClientBase.MethodInfo(
    message_pb.SearchClientMessagesResponse,
    (request: message_pb.SearchClientMessagesRequest) => {
      return request.serializeBinary();
    },
    message_pb.SearchClientMessagesResponse.deserializeBinary
  );

  searchClientMessages(
    request: message_pb.SearchClientMessagesRequest,
    metadata: grpcWeb.Metadata | null): Promise<message_pb.SearchClientMessagesResponse>;

  searchClientMessages(
    request: message_pb.SearchClientMessagesRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: message_pb.SearchClientMessagesResponse) => void): grpcWeb.ClientReadableStream<message_pb.SearchClientMessagesResponse>;

  searchClientMessages(
    request: message_pb.SearchClientMessagesRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: message_pb.SearchClientMessagesResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/message.MessageService/SearchClientMessages',
        request,
        metadata || {},
        this.methodInfoSearchClientMessages,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/message.MessageService/SearchClientMessages',
    request,
    metadata || {},
    this.methodInfoSearchClientMessages);
  }

  methodInfoGetMessageTypes = new grpcWeb.AbstractClientBase.MethodInfo(
    message_pb.GetMessageTypesResponse,
    (request: message_pb.GetMessageTypesRequest) => {
      return request.serializeBinary();
    },
    message_pb.GetMessageTypesResponse.deserializeBinary
  );

  getMessageTypes(
    request: message_pb.GetMessageTypesRequest,
    metadata: grpcWeb.Metadata | null): Promise<message_pb.GetMessageTypesResponse>;

  getMessageTypes(
    request: message_pb.GetMessageTypesRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: message_pb.GetMessageTypesResponse) => void): grpcWeb.ClientReadableStream<message_pb.GetMessageTypesResponse>;

  getMessageTypes(
    request: message_pb.GetMessageTypesRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: message_pb.GetMessageTypesResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/message.MessageService/GetMessageTypes',
        request,
        metadata || {},
        this.methodInfoGetMessageTypes,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/message.MessageService/GetMessageTypes',
    request,
    metadata || {},
    this.methodInfoGetMessageTypes);
  }

}

