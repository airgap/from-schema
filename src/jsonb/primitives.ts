import { BooleanJsonBSchema } from './BooleanJsonBSchema';
import { StringJsonBSchema } from './StringJsonBSchema';
import { NumberJsonBSchema } from './NumberJsonBSchema';
import { DateJsonBSchema } from './DateJsonBSchema';
import { LongJsonBSchema } from './LongJsonBSchema';
import { DoubleJsonBSchema } from './DoubleJsonBSchema';
import { EmailJsonBSchema } from './EmailJsonBSchema';
import { UidJsonBSchema } from './UidJsonBSchema';
import { UuidV4JsonBSchema } from './UuidV4JsonBSchema';
import { UuidV5JsonBSchema } from './UuidV5JsonBSchema';
import { IntJsonBSchema } from './IntJsonBSchema';

export const string = {
	type: 'string',
	description: 'Some text i guess lmao',
} as const satisfies StringJsonBSchema;
export const bool = {
	type: 'boolean',
	description: 'Either true or false',
} as const satisfies BooleanJsonBSchema;

export const long = {
	type: 'long',
	description: 'Any number, should probably be constrained at some point',
} as const satisfies LongJsonBSchema;

export const int = {
	type: 'int',
	description: 'Any integer',
} as const satisfies IntJsonBSchema;

export const whole = {
	type: 'long',
	description: 'Any whole number',
	minimum: 0,
} as const satisfies LongJsonBSchema;

export const double = {
	type: 'double',
	description: 'A double-precision floating point number',
} as const satisfies DoubleJsonBSchema;

export const natural = {
	type: 'long',
	description: 'Any natural number',
	minimum: 1,
} as const satisfies LongJsonBSchema;

export const date = {
	type: 'date',
	description: 'BSON Date',
} as const satisfies DateJsonBSchema;

export const email = {
	type: 'string',
	format: 'email',
} as const satisfies EmailJsonBSchema;

export const uuidv4 = {
	type: 'string',
	pattern:
		'^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
	description: 'UUID v4 (36 character hex string)',
} as const satisfies UuidV4JsonBSchema;

export const uuidv5 = {
	type: 'string',
	pattern:
		'^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
	description: 'UUID v5 (36 character hex string)',
} as const satisfies UuidV5JsonBSchema;
