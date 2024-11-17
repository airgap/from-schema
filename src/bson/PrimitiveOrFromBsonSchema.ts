import { FromBsonSchema } from './FromBsonSchema';
// import { BsonSchema } from './BsonSchema';
import { BsonSchema, BsonSchemaOrPrimitive } from './BsonSchemaOrPrimitive';

export type PrimitiveOrFromBsonSchema<T extends BsonSchemaOrPrimitive> =
	T extends BsonSchema ? FromBsonSchema<T> : T;
