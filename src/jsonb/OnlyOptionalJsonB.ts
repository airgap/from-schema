import {
	ObjectJsonBSchema,
	ObjectJsonBSchemaWithRequired,
} from './ObjectJsonBSchema';
import { FromPropertyJsonBSchemas } from './FromPropertyJsonBSchemas';
import { RequiredPropOfJsonB } from './RequiredPropOfJsonB';

export type OnlyOptionalJsonB<T extends ObjectJsonBSchema> =
	T extends ObjectJsonBSchemaWithRequired
		? Partial<Omit<FromPropertyJsonBSchemas<T>, RequiredPropOfJsonB<T>>>
		: Record<string, never>;
