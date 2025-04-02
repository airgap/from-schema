import { TsonSchema } from './tson';

type Unauthed = {
	authenticated: false;
	throws?: number[];
};

type Authed = {
	authenticated: true;
	throws?: number[];
};

export type TsonHandlerBase = {
	response?: TsonSchema;
} & (Unauthed | Authed);

export type StreamConfig = {
	tweakRequest?: TsonSchema;
	tweakResponse?: TsonSchema;
};

type GetHandlerModel = TsonHandlerBase & {
	method: 'GET';
};

type PostHandlerModel = TsonHandlerBase & {
	method: 'POST';
	request?: TsonSchema;
};

type PutHandlerModel = TsonHandlerBase & {
	method: 'PUT';
	request?: TsonSchema;
};

type DeleteHandlerModel = TsonHandlerBase & {
	method: 'DELETE';
	request?: TsonSchema;
};

type PatchHandlerModel = TsonHandlerBase & {
	method: 'PATCH';
	request?: TsonSchema;
};

type OptionsHandlerModel = TsonHandlerBase & {
	method: 'OPTIONS';
};

type HeadHandlerModel = TsonHandlerBase & {
	method: 'HEAD';
};

type VagueHandlerModel = TsonHandlerBase & {
	request?: TsonSchema;
};

export type TsonHttpHandlerModel = Readonly<
	| GetHandlerModel
	| PostHandlerModel
	| PutHandlerModel
	| DeleteHandlerModel
	| PatchHandlerModel
	| OptionsHandlerModel
	| HeadHandlerModel
	| VagueHandlerModel
>;

export type TsonStreamHandlerModel = Readonly<
	TsonHandlerBase & { stream: true | StreamConfig }
>;

export type TsonHandlerModel = TsonHttpHandlerModel | TsonStreamHandlerModel;
