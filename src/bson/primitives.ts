import { BooleanBsonSchema } from './BooleanBsonSchema';
import { StringBsonSchema } from './StringBsonSchema';
import { NumberBsonSchema } from './NumberBsonSchema';
import { ObjectIdBsonSchema } from './ObjectIdBsonSchema';
import { DateBsonSchema } from './DateBsonSchema';
import { LongBsonSchema } from './LongBsonSchema';
import { DoubleBsonSchema } from './DoubleBsonSchema';
import { EmailBsonSchema } from './EmailBsonSchema';
import { UidBsonSchema } from './UidBsonSchema';
import { UuidV4BsonSchema } from './UuidV4BsonSchema';
import { UuidV5BsonSchema } from './UuidV5BsonSchema';

export const string = {
	bsonType: 'string',
	description: 'Some text i guess lmao',
} as const satisfies StringBsonSchema;
export const bool = {
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

export const double = {
	bsonType: 'double',
	description: 'A double-precision floating point number',
} as const satisfies DoubleBsonSchema;

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

export const email = {
	bsonType: 'string',
	format: 'email',
} as const satisfies EmailBsonSchema;

export const uid = {
	bsonType: 'string',
	pattern: '^[0-9a-f]{24}$',
	description: 'MongoDB UID (24 character hex string)',
} as const satisfies UidBsonSchema;

export const uuidv4 = {
	bsonType: 'string',
	pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
	description: 'UUID v4 (36 character hex string)',
} as const satisfies UuidV4BsonSchema;

export const uuidv5 = {
	bsonType: 'string',
	pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
	description: 'UUID v5 (36 character hex string)',
} as const satisfies UuidV5BsonSchema;
