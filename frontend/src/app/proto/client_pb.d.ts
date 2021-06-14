import * as jspb from 'google-protobuf'



export class Client extends jspb.Message {
  getId(): string;
  setId(value: string): Client;

  getName(): string;
  setName(value: string): Client;

  getAddress(): string;
  setAddress(value: string): Client;

  getPhonenumber(): string;
  setPhonenumber(value: string): Client;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Client.AsObject;
  static toObject(includeInstance: boolean, msg: Client): Client.AsObject;
  static serializeBinaryToWriter(message: Client, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Client;
  static deserializeBinaryFromReader(message: Client, reader: jspb.BinaryReader): Client;
}

export namespace Client {
  export type AsObject = {
    id: string,
    name: string,
    address: string,
    phonenumber: string,
  }
}

export class CreateRequest extends jspb.Message {
  getName(): string;
  setName(value: string): CreateRequest;

  getAddress(): string;
  setAddress(value: string): CreateRequest;

  getPhonenumber(): string;
  setPhonenumber(value: string): CreateRequest;

  getTenantid(): string;
  setTenantid(value: string): CreateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRequest): CreateRequest.AsObject;
  static serializeBinaryToWriter(message: CreateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRequest;
  static deserializeBinaryFromReader(message: CreateRequest, reader: jspb.BinaryReader): CreateRequest;
}

export namespace CreateRequest {
  export type AsObject = {
    name: string,
    address: string,
    phonenumber: string,
    tenantid: string,
  }
}

export class CreateResponse extends jspb.Message {
  getClient(): Client | undefined;
  setClient(value?: Client): CreateResponse;
  hasClient(): boolean;
  clearClient(): CreateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateResponse): CreateResponse.AsObject;
  static serializeBinaryToWriter(message: CreateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateResponse;
  static deserializeBinaryFromReader(message: CreateResponse, reader: jspb.BinaryReader): CreateResponse;
}

export namespace CreateResponse {
  export type AsObject = {
    client?: Client.AsObject,
  }
}

export class NameSearchRequest extends jspb.Message {
  getName(): string;
  setName(value: string): NameSearchRequest;

  getTenantid(): string;
  setTenantid(value: string): NameSearchRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NameSearchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NameSearchRequest): NameSearchRequest.AsObject;
  static serializeBinaryToWriter(message: NameSearchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NameSearchRequest;
  static deserializeBinaryFromReader(message: NameSearchRequest, reader: jspb.BinaryReader): NameSearchRequest;
}

export namespace NameSearchRequest {
  export type AsObject = {
    name: string,
    tenantid: string,
  }
}

export class NameSearchResult extends jspb.Message {
  getId(): string;
  setId(value: string): NameSearchResult;

  getName(): string;
  setName(value: string): NameSearchResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NameSearchResult.AsObject;
  static toObject(includeInstance: boolean, msg: NameSearchResult): NameSearchResult.AsObject;
  static serializeBinaryToWriter(message: NameSearchResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NameSearchResult;
  static deserializeBinaryFromReader(message: NameSearchResult, reader: jspb.BinaryReader): NameSearchResult;
}

export namespace NameSearchResult {
  export type AsObject = {
    id: string,
    name: string,
  }
}

export class NameSearchResponse extends jspb.Message {
  getClientsList(): Array<NameSearchResult>;
  setClientsList(value: Array<NameSearchResult>): NameSearchResponse;
  clearClientsList(): NameSearchResponse;
  addClients(value?: NameSearchResult, index?: number): NameSearchResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NameSearchResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NameSearchResponse): NameSearchResponse.AsObject;
  static serializeBinaryToWriter(message: NameSearchResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NameSearchResponse;
  static deserializeBinaryFromReader(message: NameSearchResponse, reader: jspb.BinaryReader): NameSearchResponse;
}

export namespace NameSearchResponse {
  export type AsObject = {
    clientsList: Array<NameSearchResult.AsObject>,
  }
}

export class GetRequest extends jspb.Message {
  getId(): string;
  setId(value: string): GetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRequest): GetRequest.AsObject;
  static serializeBinaryToWriter(message: GetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRequest;
  static deserializeBinaryFromReader(message: GetRequest, reader: jspb.BinaryReader): GetRequest;
}

export namespace GetRequest {
  export type AsObject = {
    id: string,
  }
}

export class GetResponse extends jspb.Message {
  getClient(): Client | undefined;
  setClient(value?: Client): GetResponse;
  hasClient(): boolean;
  clearClient(): GetResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetResponse): GetResponse.AsObject;
  static serializeBinaryToWriter(message: GetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetResponse;
  static deserializeBinaryFromReader(message: GetResponse, reader: jspb.BinaryReader): GetResponse;
}

export namespace GetResponse {
  export type AsObject = {
    client?: Client.AsObject,
  }
}

