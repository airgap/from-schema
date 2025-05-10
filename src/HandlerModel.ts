import { JsonSchema } from './json';

// export type HandlerModel = HandlerModelBase & (AuthenticatedHandlerModel | AnonymouseHandlerModel) & (StreamHandlerModel | HttpHandlerModel)

type Unauthed = {
	authenticated: false;
	throws?: string[];
};

type Authed = {
	authenticated: true;
	throws?: [400, 401, 500, ...string[]];
};

type HandlerBase = {
	response?: JsonSchema;
} & (Unauthed | Authed);
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
type GetHandlerModel = HandlerBase & {
	method: 'GET';
};
type PostHandlerModel = HandlerBase & {
	method?: 'POST';
	request?: JsonSchema;
};
type PutHandlerModel = HandlerBase & {
	method: 'PUT';
	request?: JsonSchema;
};
type DeleteHandlerModel = HandlerBase & {
	method: 'DELETE';
	request?: JsonSchema;
};
type PatchHandlerModel = HandlerBase & {
	method: 'PATCH';
	request?: JsonSchema;
};
type WebsocketHandlerModel = HandlerBase & {
	stream: true;
	request?: JsonSchema;
};
export type HandlerModel = Readonly<
	| GetHandlerModel
	| PostHandlerModel
	| PutHandlerModel
	| DeleteHandlerModel
	| PatchHandlerModel
	| WebsocketHandlerModel
>;
