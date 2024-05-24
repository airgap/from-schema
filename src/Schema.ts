import { ArraySchema } from './ArraySchema';
import { EnumSchema } from './EnumSchema';
import { ObjectSchema } from './ObjectSchema';
import { StringSchema } from './StringSchema';
import { BooleanSchema } from './BooleanSchema';
import { NumberSchema } from './NumberSchema';
import { UnionSchema } from './UnionSchema';
import { MapSchema } from './MapSchema';

export type Schema =
	| ArraySchema
	| BooleanSchema
	| EnumSchema
	| MapSchema
	| NumberSchema
	| ObjectSchema
	| StringSchema
	| UnionSchema;
