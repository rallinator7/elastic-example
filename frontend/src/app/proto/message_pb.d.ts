import * as jspb from 'google-protobuf'



export class Field extends jspb.Message {
  getKey(): string;
  setKey(value: string): Field;

  getValue(): string;
  setValue(value: string): Field;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Field.AsObject;
  static toObject(includeInstance: boolean, msg: Field): Field.AsObject;
  static serializeBinaryToWriter(message: Field, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Field;
  static deserializeBinaryFromReader(message: Field, reader: jspb.BinaryReader): Field;
}

export namespace Field {
  export type AsObject = {
    key: string,
    value: string,
  }
}

export class Message extends jspb.Message {
  getId(): string;
  setId(value: string): Message;

  getType(): string;
  setType(value: string): Message;

  getFieldsList(): Array<Field>;
  setFieldsList(value: Array<Field>): Message;
  clearFieldsList(): Message;
  addFields(value?: Field, index?: number): Field;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    id: string,
    type: string,
    fieldsList: Array<Field.AsObject>,
  }
}

export class CreateRequest extends jspb.Message {
  getTenantid(): string;
  setTenantid(value: string): CreateRequest;

  getClientid(): string;
  setClientid(value: string): CreateRequest;

  getType(): string;
  setType(value: string): CreateRequest;

  getFieldsList(): Array<Field>;
  setFieldsList(value: Array<Field>): CreateRequest;
  clearFieldsList(): CreateRequest;
  addFields(value?: Field, index?: number): Field;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRequest): CreateRequest.AsObject;
  static serializeBinaryToWriter(message: CreateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRequest;
  static deserializeBinaryFromReader(message: CreateRequest, reader: jspb.BinaryReader): CreateRequest;
}

export namespace CreateRequest {
  export type AsObject = {
    tenantid: string,
    clientid: string,
    type: string,
    fieldsList: Array<Field.AsObject>,
  }
}

export class CreateResponse extends jspb.Message {
  getMessage(): Message | undefined;
  setMessage(value?: Message): CreateResponse;
  hasMessage(): boolean;
  clearMessage(): CreateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateResponse): CreateResponse.AsObject;
  static serializeBinaryToWriter(message: CreateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateResponse;
  static deserializeBinaryFromReader(message: CreateResponse, reader: jspb.BinaryReader): CreateResponse;
}

export namespace CreateResponse {
  export type AsObject = {
    message?: Message.AsObject,
  }
}

export class GetAllRequest extends jspb.Message {
  getClientid(): string;
  setClientid(value: string): GetAllRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllRequest): GetAllRequest.AsObject;
  static serializeBinaryToWriter(message: GetAllRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllRequest;
  static deserializeBinaryFromReader(message: GetAllRequest, reader: jspb.BinaryReader): GetAllRequest;
}

export namespace GetAllRequest {
  export type AsObject = {
    clientid: string,
  }
}

export class GetAllResponse extends jspb.Message {
  getMessagesList(): Array<Message>;
  setMessagesList(value: Array<Message>): GetAllResponse;
  clearMessagesList(): GetAllResponse;
  addMessages(value?: Message, index?: number): Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllResponse): GetAllResponse.AsObject;
  static serializeBinaryToWriter(message: GetAllResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllResponse;
  static deserializeBinaryFromReader(message: GetAllResponse, reader: jspb.BinaryReader): GetAllResponse;
}

export namespace GetAllResponse {
  export type AsObject = {
    messagesList: Array<Message.AsObject>,
  }
}

export class GetAllOfTypeRequest extends jspb.Message {
  getClientid(): string;
  setClientid(value: string): GetAllOfTypeRequest;

  getType(): string;
  setType(value: string): GetAllOfTypeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllOfTypeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllOfTypeRequest): GetAllOfTypeRequest.AsObject;
  static serializeBinaryToWriter(message: GetAllOfTypeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllOfTypeRequest;
  static deserializeBinaryFromReader(message: GetAllOfTypeRequest, reader: jspb.BinaryReader): GetAllOfTypeRequest;
}

export namespace GetAllOfTypeRequest {
  export type AsObject = {
    clientid: string,
    type: string,
  }
}

export class GetAllOfTypeResponse extends jspb.Message {
  getMessagesList(): Array<Message>;
  setMessagesList(value: Array<Message>): GetAllOfTypeResponse;
  clearMessagesList(): GetAllOfTypeResponse;
  addMessages(value?: Message, index?: number): Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllOfTypeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllOfTypeResponse): GetAllOfTypeResponse.AsObject;
  static serializeBinaryToWriter(message: GetAllOfTypeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllOfTypeResponse;
  static deserializeBinaryFromReader(message: GetAllOfTypeResponse, reader: jspb.BinaryReader): GetAllOfTypeResponse;
}

export namespace GetAllOfTypeResponse {
  export type AsObject = {
    messagesList: Array<Message.AsObject>,
  }
}

export class SearchClientMessagesRequest extends jspb.Message {
  getClientid(): string;
  setClientid(value: string): SearchClientMessagesRequest;

  getMessagecontent(): string;
  setMessagecontent(value: string): SearchClientMessagesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchClientMessagesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SearchClientMessagesRequest): SearchClientMessagesRequest.AsObject;
  static serializeBinaryToWriter(message: SearchClientMessagesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchClientMessagesRequest;
  static deserializeBinaryFromReader(message: SearchClientMessagesRequest, reader: jspb.BinaryReader): SearchClientMessagesRequest;
}

export namespace SearchClientMessagesRequest {
  export type AsObject = {
    clientid: string,
    messagecontent: string,
  }
}

export class SearchClientMessagesResponse extends jspb.Message {
  getMessagesList(): Array<Message>;
  setMessagesList(value: Array<Message>): SearchClientMessagesResponse;
  clearMessagesList(): SearchClientMessagesResponse;
  addMessages(value?: Message, index?: number): Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchClientMessagesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SearchClientMessagesResponse): SearchClientMessagesResponse.AsObject;
  static serializeBinaryToWriter(message: SearchClientMessagesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchClientMessagesResponse;
  static deserializeBinaryFromReader(message: SearchClientMessagesResponse, reader: jspb.BinaryReader): SearchClientMessagesResponse;
}

export namespace SearchClientMessagesResponse {
  export type AsObject = {
    messagesList: Array<Message.AsObject>,
  }
}

export class GetMessageTypesRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMessageTypesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetMessageTypesRequest): GetMessageTypesRequest.AsObject;
  static serializeBinaryToWriter(message: GetMessageTypesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMessageTypesRequest;
  static deserializeBinaryFromReader(message: GetMessageTypesRequest, reader: jspb.BinaryReader): GetMessageTypesRequest;
}

export namespace GetMessageTypesRequest {
  export type AsObject = {
  }
}

export class GetMessageTypesResponse extends jspb.Message {
  getTypesList(): Array<string>;
  setTypesList(value: Array<string>): GetMessageTypesResponse;
  clearTypesList(): GetMessageTypesResponse;
  addTypes(value: string, index?: number): GetMessageTypesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMessageTypesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetMessageTypesResponse): GetMessageTypesResponse.AsObject;
  static serializeBinaryToWriter(message: GetMessageTypesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMessageTypesResponse;
  static deserializeBinaryFromReader(message: GetMessageTypesResponse, reader: jspb.BinaryReader): GetMessageTypesResponse;
}

export namespace GetMessageTypesResponse {
  export type AsObject = {
    typesList: Array<string>,
  }
}

