import { JsonSchemaOrPrimitive } from './json';

// export type HandlerModel = HandlerModelBase & (AuthenticatedHandlerModel | AnonymouseHandlerModel) & (StreamHandlerModel | HttpHandlerModel)
export type HandlerModel = Readonly<{
	request?: JsonSchemaOrPrimitive;
	response?: JsonSchemaOrPrimitive;
	authenticated?: boolean;
	stream?: boolean;
}>;
