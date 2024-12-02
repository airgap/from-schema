import { FromJsonBSchema } from './FromJsonBSchema';
import { JsonBSchema, JsonBSchemaOrPrimitive } from './JsonBSchemaOrPrimitive';

export type PrimitiveOrFromJsonBSchema<T extends JsonBSchemaOrPrimitive> =
	T extends JsonBSchema ? FromJsonBSchema<T> : T;
