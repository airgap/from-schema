import { BooleanTsonSchema } from './BooleanTsonSchema';
import { StringTsonSchema } from './StringTsonSchema';
import { NumberTsonSchema } from './NumberTsonSchema';
import { DateTsonSchema } from './DateTsonSchema';
import { BigIntTsonSchema } from './BigIntTsonSchema';

export const string = {
	type: 'string',
	description: 'Some text i guess lmao',
} as const satisfies StringTsonSchema;
export const boolean = {
	type: 'boolean',
	description: 'Either true or false',
} as const satisfies BooleanTsonSchema;

export const number = {
	type: 'number',
	description: 'Any number, should probably be constrained at some point',
} as const satisfies NumberTsonSchema;

export const bigint = {
	type: 'bigint',
	description: 'Any bigint',
} as const satisfies BigIntTsonSchema;

export const natural = {
	type: 'integer',
	description: 'Any natural number',
	minimum: 1,
} as const satisfies NumberTsonSchema;

export const date = {
	type: 'date',
	description: 'Any date',
} as const satisfies DateTsonSchema;
