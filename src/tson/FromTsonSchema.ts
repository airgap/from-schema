import { BooleanTsonSchema } from './BooleanTsonSchema';
import { NumberTsonSchema } from './NumberTsonSchema';
import { ObjectTsonSchema } from './ObjectTsonSchema';
import { StringTsonSchema } from './StringTsonSchema';
import { PrimitiveOrFromTsonSchema } from './PrimitiveOrFromTsonSchema';
import { FromObjectTsonSchema } from './FromObjectTsonSchema';
import { ArrayTsonSchema } from './ArrayTsonSchema';
import { EnumTsonSchemaOf } from './EnumTsonSchemaOf';
import {
	FromMapTsonSchema,
	MapTsonSchema,
	MapTsonSchemaOf,
} from './MapTsonSchema';
import { UnionTsonSchema } from './UnionTsonSchema';
import { DateTsonSchema } from './DateTsonSchema';
import {
	ExclusiveTsonSchema,
	ExclusiveTsonSchemaOf,
} from './ExclusiveTsonSchema';

export type FromTsonSchema<T> = T extends DateTsonSchema
	? string
	: T extends StringTsonSchema
		? string
		: T extends NumberTsonSchema
			? number
			: T extends BooleanTsonSchema
				? boolean
				: // : T extends ExclusiveJsonSchemaOf<infer P>
					// 	? FromJsonSchema<P>
					T extends EnumTsonSchemaOf<infer P>
					? PrimitiveOrFromTsonSchema<P>
					: T extends ObjectTsonSchema
						? FromObjectTsonSchema<T>
						: T extends MapTsonSchema
							? FromMapTsonSchema<T>
							: T extends ArrayTsonSchema
								? FromTsonSchema<T['items']>[]
								: never;
