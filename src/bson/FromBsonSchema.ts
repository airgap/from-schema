import { BooleanBsonSchema } from './BooleanBsonSchema';
import { NumberBsonSchema } from './NumberBsonSchema';
import { ObjectBsonSchema } from './ObjectBsonSchema';
import { StringBsonSchema } from './StringBsonSchema';
import { PrimitiveOrFromBsonSchema } from './PrimitiveOrFromBsonSchema';
import { FromObjectBsonSchema } from './FromObjectBsonSchema';
import { ArrayBsonSchema } from './ArrayBsonSchema';
import { EnumBsonSchemaOf } from './EnumBsonSchemaOf';
import { FromMapBsonSchema, MapBsonSchema } from './MapBsonSchema';
import { UnionBsonSchemaOf } from './UnionBsonSchema';
import { DateBsonSchema } from './DateBsonSchema';

export type FromBsonSchema<T> = T extends DateBsonSchema
	? Date | string
	: T extends StringBsonSchema
		? string
		: T extends NumberBsonSchema
			? number
			: T extends BooleanBsonSchema
				? boolean
				: T extends UnionBsonSchemaOf<infer P>
					? PrimitiveOrFromBsonSchema<P>
					: T extends EnumBsonSchemaOf<infer P>
						? PrimitiveOrFromBsonSchema<P>
						: T extends ObjectBsonSchema
							? FromObjectBsonSchema<T>
							: T extends MapBsonSchema
								? FromMapBsonSchema<T>
								: T extends ArrayBsonSchema
									? FromBsonSchema<T['items']>[]
									: never;
