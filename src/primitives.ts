import { BooleanSchema } from './BooleanSchema';
import { StringSchema } from './StringSchema';
import { NumberSchema } from './NumberSchema';
import { ObjectIdSchema } from './ObjectIdSchema';
import { DateSchema } from './DateSchema';

export const string = {
	type: 'string',
	description: 'Some text i guess lmao',
} as const satisfies StringSchema;
export const boolean = {
	type: 'boolean',
	description: 'Either true or false',
} as const satisfies BooleanSchema;

export const number = {
	type: 'number',
	description: 'Any number, should probably be constrained at some point',
} as const satisfies NumberSchema;

export const integer = {
	type: 'integer',
	description: 'Any integer',
} as const satisfies NumberSchema;

export const whole = {
	type: 'integer',
	description: 'Any whole number',
	minimum: 0,
} as const satisfies NumberSchema;

export const natural = {
	type: 'integer',
	description: 'Any natural number',
	minimum: 1,
} as const satisfies NumberSchema;
export const objectId = {
	bsonType: 'objectId',
	// description: 'BSON ObjectId'
} as const satisfies ObjectIdSchema;

export const date = {
	bsonType: 'date',
} as const satisfies DateSchema;
