import { BooleanJsonBSchema } from './BooleanJsonBSchema';
import { NumberJsonBSchema } from './NumberJsonBSchema';
import { ObjectJsonBSchema } from './ObjectJsonBSchema';
import { StringJsonBSchema } from './StringJsonBSchema';
import { PrimitiveOrFromJsonBSchema } from './PrimitiveOrFromJsonBSchema';
import { FromObjectJsonBSchema } from './FromObjectJsonBSchema';
import { ArrayJsonBSchema } from './ArrayJsonBSchema';
import { EnumJsonBSchemaOf } from './EnumJsonBSchemaOf';
import { FromMapJsonBSchema, MapJsonBSchema } from './MapJsonBSchema';
import { UnionJsonBSchemaOf } from './UnionJsonBSchema';
import { DateJsonBSchema } from './DateJsonBSchema';

export type FromJsonBSchema<T> = T extends DateJsonBSchema
	? Date | string
	: T extends StringJsonBSchema
		? string
		: T extends NumberJsonBSchema
			? number
			: T extends BooleanJsonBSchema
				? boolean
				: T extends UnionJsonBSchemaOf<infer P>
					? PrimitiveOrFromJsonBSchema<P>
					: T extends EnumJsonBSchemaOf<infer P>
						? PrimitiveOrFromJsonBSchema<P>
						: T extends ObjectJsonBSchema
							? FromObjectJsonBSchema<T>
							: T extends MapJsonBSchema
								? FromMapJsonBSchema<T>
								: T extends ArrayJsonBSchema
									? FromJsonBSchema<T['items']>[]
									: never;
