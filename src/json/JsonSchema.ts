import { ArrayJsonSchema } from './ArrayJsonSchema';
import { EnumJsonSchema } from './EnumJsonSchema';
import { ObjectJsonSchema } from './ObjectJsonSchema';
import { StringJsonSchema } from './StringJsonSchema';
import { BooleanJsonSchema } from './BooleanJsonSchema';
import { NumberJsonSchema } from './NumberJsonSchema';
import { UnionJsonSchema } from './UnionJsonSchema';
import { MapJsonSchema } from './MapJsonSchema';
import { DateJsonSchema } from './DateJsonSchema';

export type JsonSchema =
	| ArrayJsonSchema
	| BooleanJsonSchema
	| EnumJsonSchema
	| DateJsonSchema
	| MapJsonSchema
	| NumberJsonSchema
	| ObjectJsonSchema
	| StringJsonSchema
	| UnionJsonSchema;
