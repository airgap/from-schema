import { TsonSchema } from './tson';

export type TsonHandlerBase = {
	request?: TsonSchema;
	response?: TsonSchema;
};

export type StreamConfig = {
	tweakRequest?: TsonSchema;
	tweakResponse?: TsonSchema;
};

// export type HandlerModel = HandlerModelBase & (AuthenticatedHandlerModel | AnonymouseHandlerModel) & (StreamHandlerModel | HttpHandlerModel)
export type TsonHttpHandlerModel = TsonHandlerBase & Readonly<{
	authenticated?: boolean;
	stream?: false;
}>;

export type TsonStreamHandlerModel = TsonHandlerBase & Readonly<{
	authenticated?: boolean;
	stream: true | StreamConfig;
}>;

export type TsonHandlerModel = TsonHttpHandlerModel | TsonStreamHandlerModel;
