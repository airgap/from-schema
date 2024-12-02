import { JsonSchema } from './json';

// export type HandlerModel = HandlerModelBase & (AuthenticatedHandlerModel | AnonymouseHandlerModel) & (StreamHandlerModel | HttpHandlerModel)
export type HandlerModel = Readonly<{
	request?: JsonSchema;
	response?: JsonSchema;
	authenticated?: boolean;
	stream?: boolean;
}>;
