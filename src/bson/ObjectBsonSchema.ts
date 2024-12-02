import { SchemaBase } from '../generic/SchemaBase';
import { BsonSchemaOrPrimitive } from './BsonSchemaOrPrimitive';

// Schema for objects without `required` properties
export type ObjectBsonSchemaWithoutRequired = SchemaBase & {
	readonly bsonType: 'object';
	readonly properties: Record<string, any>;
	readonly minProperties?: number;
	readonly maxProperties?: number;
	readonly examples?: Record<string, any>[];
	readonly additionalProperties?: false | any;
};

// Schema for objects with `required` properties
export type ObjectBsonSchemaWithRequired = ObjectBsonSchemaWithoutRequired & {
	readonly required: readonly string[];
};

// Extend the main ObjectBsonSchema type to support unions and intersections
export type ObjectBsonSchema =
	| ObjectBsonSchemaWithoutRequired
	| ObjectBsonSchemaWithRequired;
