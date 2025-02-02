import { TsonSchema } from './tson';

export type TsonHandlerBase = {
	response?: TsonSchema;
	authenticated?: boolean;
};

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

// export type HandlerModel = HandlerModelBase & (AuthenticatedHandlerModel | AnonymouseHandlerModel) & (StreamHandlerModel | HttpHandlerModel)
export type TsonHttpHandlerModel = Readonly<
	| GetHandlerModel
	| PostHandlerModel
	| PutHandlerModel
	| DeleteHandlerModel
	| PatchHandlerModel
	| OptionsHandlerModel
	| HeadHandlerModel
>;

export type TsonStreamHandlerModel = Readonly<
	TsonHandlerBase & { stream: true | StreamConfig }
>;

export type TsonHandlerModel = TsonHttpHandlerModel | TsonStreamHandlerModel;
