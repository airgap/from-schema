import { BooleanSchema } from './BooleanSchema';
import { NumberSchema } from './NumberSchema';
import { ObjectSchema } from './ObjectSchema';
import { StringSchema } from './StringSchema';
import { PrimitiveOrFromSchema } from './PrimitiveOrFromSchema';
import { FromObjectSchema } from './FromObjectSchema';
import { ArraySchema } from './ArraySchema';
import { EnumSchemaOf } from './EnumSchemaOf';
import { FromMapSchema, MapSchema, MapSchemaOf } from './MapSchema';
import { UnionSchemaOf } from './UnionSchema';
import { DateSchema } from './DateSchema';
import { ObjectIdSchema } from './ObjectIdSchema';

export type FromSchema<T> = T extends DateSchema
	? Date | string
	: T extends StringSchema | ObjectIdSchema
		? string
		: T extends NumberSchema
			? number
			: T extends BooleanSchema
				? boolean
				: T extends UnionSchemaOf<infer P>
					? PrimitiveOrFromSchema<P>
					: T extends EnumSchemaOf<infer P>
						? PrimitiveOrFromSchema<P>
						: T extends ObjectSchema
							? FromObjectSchema<T>
							: T extends MapSchema
								? FromMapSchema<T>
								: T extends ArraySchema
									? FromSchema<T['items']>[]
									: never;
