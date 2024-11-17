import {
	ObjectJsonSchema,
	ObjectJsonSchemaWithRequired,
} from './ObjectJsonSchema';
import { FromPropertySchemas } from './FromPropertySchemasJson';
import { RequiredPropOf } from './RequiredPropOfJson';

export type OnlyRequired<T extends ObjectJsonSchema> =
	T extends ObjectJsonSchemaWithRequired
		? Required<Pick<FromPropertySchemas<T>, RequiredPropOf<T>>>
		: Record<string, never>;
