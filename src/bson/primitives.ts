import { BooleanBsonSchema } from './BooleanBsonSchema';
import { StringBsonSchema } from './StringBsonSchema';
import { NumberBsonSchema } from './NumberBsonSchema';
import { ObjectIdBsonSchema } from './ObjectIdBsonSchema';
import { DateBsonSchema } from './DateBsonSchema';
import { LongBsonSchema } from './LongBsonSchema';

export const string = {
	bsonType: 'string',
	description: 'Some text i guess lmao',
} as const satisfies StringBsonSchema;
export const boolean = {
	bsonType: 'bool',
	description: 'Either true or false',
} as const satisfies BooleanBsonSchema;

export const long = {
	bsonType: 'long',
	description: 'Any number, should probably be constrained at some point',
} as const satisfies LongBsonSchema;

export const int = {
	bsonType: 'int',
	description: 'Any integer',
} as const satisfies NumberBsonSchema;

export const whole = {
	bsonType: 'long',
	description: 'Any whole number',
	minimum: 0,
} as const satisfies LongBsonSchema;

export const natural = {
	bsonType: 'long',
	description: 'Any natural number',
	minimum: 1,
} as const satisfies LongBsonSchema;
export const objectId = {
	bsonType: 'objectId',
	description: 'BSON ObjectId',
} as const satisfies ObjectIdBsonSchema;

export const date = {
	bsonType: 'date',
	description: 'BSON Date',
} as const satisfies DateBsonSchema;
