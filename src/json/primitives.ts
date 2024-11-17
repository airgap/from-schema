import { BooleanJsonSchema } from './BooleanJsonSchema';
import { StringJsonSchema } from './StringJsonSchema';
import { NumberJsonSchema } from './NumberJsonSchema';
import { DateJsonSchema } from './DateJsonSchema';
import { IntegerJsonSchema } from './IntegerJsonSchema';

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
