import { SchemaBase } from '../generic/SchemaBase';
import { BsonSchemaOrPrimitive } from './BsonSchemaOrPrimitive';
export type ObjectBsonSchemaWithoutRequired = SchemaBase & {
	readonly bsonType: 'object';
	readonly properties: Record<string, BsonSchemaOrPrimitive>;
	readonly minProperties?: number;
	readonly maxProperties?: number;
	readonly examples?: Record<string, BsonSchemaOrPrimitive>[];
	readonly additionalProperties?: false | BsonSchemaOrPrimitive;
};
export type ObjectBsonSchemaWithRequired = ObjectBsonSchemaWithoutRequired & {
	readonly required: readonly string[];
};
export type ObjectBsonSchema =
	| ObjectBsonSchemaWithoutRequired
	| ObjectBsonSchemaWithRequired;
