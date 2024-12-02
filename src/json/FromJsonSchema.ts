import { BooleanJsonSchema } from './BooleanJsonSchema';
import { NumberJsonSchema } from './NumberJsonSchema';
import { ObjectJsonSchema } from './ObjectJsonSchema';
import { StringJsonSchema } from './StringJsonSchema';
import { PrimitiveOrFromJsonSchema } from './PrimitiveOrFromJsonSchema';
import { FromObjectJsonSchema } from './FromObjectJsonSchema';
import { ArrayJsonSchema } from './ArrayJsonSchema';
import { EnumJsonSchemaOf } from './EnumJsonSchemaOf';
import {
	FromMapJsonSchema,
	MapJsonSchema,
	MapJsonSchemaOf,
} from './MapJsonSchema';
import { UnionJsonSchema } from './UnionJsonSchema';
import { DateJsonSchema } from './DateJsonSchema';
import type { ObjectId } from 'mongodb';
import {
	ExclusiveJsonSchema,
	ExclusiveJsonSchemaOf,
} from './ExclusiveJsonSchema';

export type FromJsonSchema<T> = T extends DateJsonSchema
	? string
	: T extends StringJsonSchema
		? string
		: T extends NumberJsonSchema
			? number
			: T extends BooleanJsonSchema
				? boolean
				: // : T extends ExclusiveJsonSchemaOf<infer P>
					// 	? FromJsonSchema<P>
					T extends EnumJsonSchemaOf<infer P>
					? PrimitiveOrFromJsonSchema<P>
					: T extends ObjectJsonSchema
						? FromObjectJsonSchema<T>
						: T extends MapJsonSchema
							? FromMapJsonSchema<T>
							: T extends ArrayJsonSchema
								? FromJsonSchema<T['items']>[]
								: never;
