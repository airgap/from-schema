import { Schema } from './Schema';

// export type HandlerModel = HandlerModelBase & (AuthenticatedHandlerModel | AnonymouseHandlerModel) & (StreamHandlerModel | HttpHandlerModel)
export type HandlerModel = Readonly<{
	request?: Schema;
	response?: Schema;
	authenticated?: boolean;
	stream?: boolean;
}>;
