import { FromSchema } from './FromSchema';
import { Schema } from './Schema';
import { SchemaOrPrimitive } from './SchemaOrPrimitive';

export type PrimitiveOrFromSchema<T extends SchemaOrPrimitive> =
	T extends Schema ? FromSchema<T> : T;
