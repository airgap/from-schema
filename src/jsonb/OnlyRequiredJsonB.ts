import {
	ObjectJsonBSchema,
	ObjectJsonBSchemaWithRequired,
} from './ObjectJsonBSchema';
import { FromPropertyJsonBSchemas } from './FromPropertyJsonBSchemas';
import { RequiredPropOfJsonB } from './RequiredPropOfJsonB';

export type OnlyRequiredJsonB<T extends ObjectJsonBSchema> =
	T extends ObjectJsonBSchemaWithRequired
		? Required<Pick<FromPropertyJsonBSchemas<T>, RequiredPropOfJsonB<T>>>
		: Record<string, never>;
