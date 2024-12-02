import { Primitive } from '../generic';
import { ArrayBsonSchema } from './ArrayBsonSchema';
import { EnumBsonSchema } from './EnumBsonSchema';
import { ObjectBsonSchema } from './ObjectBsonSchema';
import { StringBsonSchema } from './StringBsonSchema';
import { BooleanBsonSchema } from './BooleanBsonSchema';
import { NumberBsonSchema } from './NumberBsonSchema';
import { UnionBsonSchema } from './UnionBsonSchema';
import { MapBsonSchema } from './MapBsonSchema';
import { ObjectIdBsonSchema } from './ObjectIdBsonSchema';
import { DateBsonSchema } from './DateBsonSchema';
import { OneOfBsonSchema } from './OneOfBsonSchema';
import { AnyOfBsonSchema } from './AnyOfBsonSchema';
import { AllOfBsonSchema } from './AllOfBsonSchema';

export type BsonSchema =
	| ArrayBsonSchema
	| BooleanBsonSchema
	| EnumBsonSchema
	| DateBsonSchema
	| MapBsonSchema
	| NumberBsonSchema
	| ObjectIdBsonSchema
	| ObjectBsonSchema
	| StringBsonSchema
	| UnionBsonSchema
	| OneOfBsonSchema
	| AllOfBsonSchema
	| AnyOfBsonSchema;

export type BsonSchemaOrPrimitive = BsonSchema | Primitive;
