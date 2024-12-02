import { BooleanJsonSchema } from './BooleanJsonSchema';
import { StringJsonSchema } from './StringJsonSchema';
import { NumberJsonSchema } from './NumberJsonSchema';
import { DateJsonSchema } from './DateJsonSchema';
import { IntegerJsonSchema } from './IntegerJsonSchema';
import { bsonPrimitives } from '../bson';
import { bsonToJson } from '../bson2json/bsonToJson';
import { UidJsonSchema } from './UidJsonSchema';
import { UuidV4JsonSchema } from './UuidV4JsonSchema';
import { UuidV5JsonSchema } from './UuidV5JsonSchema';

export const string = {
	type: 'string',
	description: 'Some text i guess lmao',
} as const satisfies StringJsonSchema;
export const boolean = {
	type: 'boolean',
	description: 'Either true or false',
} as const satisfies BooleanJsonSchema;

export const number = {
	type: 'number',
	description: 'Any number, should probably be constrained at some point',
} as const satisfies NumberJsonSchema;

export const integer = {
	type: 'integer',
	description: 'Any integer',
} as const satisfies IntegerJsonSchema;

export const whole = {
	type: 'integer',
	description: 'Any whole number',
	minimum: 0,
} as const satisfies IntegerJsonSchema;

export const natural = {
	type: 'integer',
	description: 'Any natural number',
	minimum: 1,
} as const satisfies IntegerJsonSchema;

export const date = {
	type: 'string',
	format: 'date-time',
} as const satisfies DateJsonSchema;

export const email = {
	type: 'string',
	format: 'email',
} as const satisfies StringJsonSchema;

export const uid = {
	type: 'string',
	pattern: '^[0-9a-f]{24}$',
	description: 'MongoDB UID (24 character hex string)',
} as const satisfies UidJsonSchema;

export const uuidv4 = {
	type: 'string',
	pattern:
		'^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
	description: 'UUID v4 (36 character hex string)',
} as const satisfies UuidV4JsonSchema;

export const uuidv5 = {
	type: 'string',
	pattern:
		'^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
	description: 'UUID v5 (36 character hex string)',
} as const satisfies UuidV5JsonSchema;
