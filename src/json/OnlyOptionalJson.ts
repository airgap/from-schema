import { FromPropertySchemas } from './FromPropertySchemasJson';
import { RequiredPropOf } from './RequiredPropOfJson';
import {
	ObjectJsonSchema,
	ObjectJsonSchemaWithRequired,
} from './ObjectJsonSchema';

export type OnlyOptional<T extends ObjectJsonSchema> =
	T extends ObjectJsonSchemaWithRequired
		? Partial<Omit<FromPropertySchemas<T>, RequiredPropOf<T>>>
		: Record<string, never>;
