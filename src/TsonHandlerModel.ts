import { TsonSchema } from './tson';

export type TsonHandlerBase = {
	readonly response?: TsonSchema;
	readonly authenticated?: boolean;
	readonly throws?: readonly number[];
};

export type StreamConfig = {
	readonly tweakRequest?: TsonSchema;
	readonly tweakResponse?: TsonSchema;
};

type GetHandlerModel = TsonHandlerBase & {
	readonly method: 'GET';
};

type PostHandlerModel = TsonHandlerBase & {
	readonly method: 'POST';
	readonly request?: TsonSchema;
};

type PutHandlerModel = TsonHandlerBase & {
	readonly method: 'PUT';
	readonly request?: TsonSchema;
};

type DeleteHandlerModel = TsonHandlerBase & {
	readonly method: 'DELETE';
	readonly request?: TsonSchema;
};

type PatchHandlerModel = TsonHandlerBase & {
	readonly method: 'PATCH';
	readonly request?: TsonSchema;
};

type OptionsHandlerModel = TsonHandlerBase & {
	readonly method: 'OPTIONS';
};

type HeadHandlerModel = TsonHandlerBase & {
	readonly method: 'HEAD';
};

type VagueHandlerModel = TsonHandlerBase & {
	readonly request?: TsonSchema;
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
	TsonHandlerBase & { readonly stream: true | StreamConfig }
>;

export type TsonHandlerModel = TsonHttpHandlerModel | TsonStreamHandlerModel;
