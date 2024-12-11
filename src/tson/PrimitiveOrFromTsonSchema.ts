import { FromTsonSchema } from './FromTsonSchema';
import { TsonSchema } from './TsonSchema';
import { TsonSchemaOrPrimitive } from './TsonSchemaOrPrimitive';

export type PrimitiveOrFromTsonSchema<T extends TsonSchemaOrPrimitive> =
	T extends TsonSchema ? FromTsonSchema<T> : T;
