import { SchemaBase } from '../generic/SchemaBase';
import { JsonBSchemaOrPrimitive } from './JsonBSchemaOrPrimitive';

// Schema for objects without `required` properties
export type ObjectJsonBSchemaWithoutRequired = SchemaBase & {
	readonly type: 'object';
	readonly properties: Record<string, any>;
	readonly minProperties?: number;
	readonly maxProperties?: number;
	readonly examples?: Record<string, any>[];
	readonly additionalProperties?: false | any;
};

// Schema for objects with `required` properties
export type ObjectJsonBSchemaWithRequired = ObjectJsonBSchemaWithoutRequired & {
	readonly required: readonly string[];
};

// Extend the main ObjectJsonBSchema type to support unions and intersections
export type ObjectJsonBSchema =
	| ObjectJsonBSchemaWithoutRequired
	| ObjectJsonBSchemaWithRequired;
