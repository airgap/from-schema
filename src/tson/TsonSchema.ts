import { ArrayTsonSchema } from './ArrayTsonSchema';
import { EnumTsonSchema } from './EnumTsonSchema';
import { ObjectTsonSchema } from './ObjectTsonSchema';
import { StringTsonSchema } from './StringTsonSchema';
import { BooleanTsonSchema } from './BooleanTsonSchema';
import { NumberTsonSchema } from './NumberTsonSchema';
import { UnionTsonSchema } from './UnionTsonSchema';
import { MapTsonSchema } from './MapTsonSchema';
import { DateTsonSchema } from './DateTsonSchema';
import { IntersectionTsonSchema } from './IntersectionTsonSchema';
import { ExclusiveTsonSchema } from './ExclusiveTsonSchema';
import { BigIntTsonSchema } from './BigIntTsonSchema';

export type TsonSchema =
	| ArrayTsonSchema
	| BooleanTsonSchema
	| EnumTsonSchema
	| DateTsonSchema
	| MapTsonSchema
	| NumberTsonSchema
	| ObjectTsonSchema
	| StringTsonSchema
	| UnionTsonSchema
	| ExclusiveTsonSchema
	| IntersectionTsonSchema
	| BigIntTsonSchema;
