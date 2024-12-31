import { TsonSchema } from './tson';

// export type HandlerModel = HandlerModelBase & (AuthenticatedHandlerModel | AnonymouseHandlerModel) & (StreamHandlerModel | HttpHandlerModel)
export type TsonHandlerModel = Readonly<{
	request?: TsonSchema;
	response?: TsonSchema;
	authenticated?: boolean;
	stream?: boolean | { tweakRequest?: TsonSchema; tweakResponse?: TsonSchema };
}>;
