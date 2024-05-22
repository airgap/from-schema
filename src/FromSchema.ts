import { BooleanSchema } from './BooleanSchema';
import { NumberSchema } from './NumberSchema';
import { ObjectSchema } from './ObjectSchema';
import { StringSchema } from './StringSchema';
import { SchemaOrPrimitive } from './SchemaOrPrimitive';
import { UnionSchemaOf } from './UnionSchemaOf';
import { PrimitiveOrFromSchema } from './PrimitiveOrFromSchema';
import { FromObjectSchema } from './FromObjectSchema';
import { ArraySchema } from './ArraySchema';
import { NoSchema } from './NoSchema';

export type FromSchema<T> = T extends StringSchema
	? string
	: T extends NumberSchema
		? number
		: T extends BooleanSchema
			? boolean
			: T extends UnionSchemaOf<infer P extends SchemaOrPrimitive>
				? PrimitiveOrFromSchema<P>
				: T extends ObjectSchema
					? FromObjectSchema<T>
					: T extends ArraySchema
						? FromSchema<T['items']>[]
						: NoSchema;
