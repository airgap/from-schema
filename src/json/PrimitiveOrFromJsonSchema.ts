import { FromJsonSchema } from './FromJsonSchema';
import { JsonSchema } from './JsonSchema';
import { JsonSchemaOrPrimitive } from './JsonSchemaOrPrimitive';

export type PrimitiveOrFromJsonSchema<T extends JsonSchemaOrPrimitive> =
	T extends JsonSchema ? FromJsonSchema<T> : T;
