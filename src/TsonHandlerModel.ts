import { TsonSchema } from './tson';

export type TsonHandlerBase = {
	request?: TsonSchema;
	response?: TsonSchema;
	authenticated?: boolean;
};

export type StreamConfig = {
	tweakRequest?: TsonSchema;
	tweakResponse?: TsonSchema;
};

// export type HandlerModel = HandlerModelBase & (AuthenticatedHandlerModel | AnonymouseHandlerModel) & (StreamHandlerModel | HttpHandlerModel)
export type TsonHttpHandlerModel = TsonHandlerBase &
	Readonly<{
		stream?: false;
	}>;

export type TsonStreamHandlerModel = TsonHandlerBase &
	Readonly<{
		stream: true | StreamConfig;
	}>;

export type TsonHandlerModel = TsonHttpHandlerModel | TsonStreamHandlerModel;
