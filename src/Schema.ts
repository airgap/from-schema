import { ArraySchema } from './ArraySchema';
import { EnumSchema } from './EnumSchema';
import { ObjectSchema } from './ObjectSchema';
import { StringSchema } from './StringSchema';
import { BooleanSchema } from './BooleanSchema';
import { NumberSchema } from './NumberSchema';

export type Schema =
	| ObjectSchema
	| ArraySchema
	| NumberSchema
	| StringSchema
	| BooleanSchema
	| EnumSchema;
