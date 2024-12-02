import { SchemaBase } from '../generic';
import { JsonSchemaOrPrimitive } from './JsonSchemaOrPrimitive';

export type ObjectJsonSchemaWithoutRequired = SchemaBase & {
	readonly type: 'object';
	readonly properties: Record<string, JsonSchemaOrPrimitive>;
	readonly minProperties?: number;
	readonly maxProperties?: number;
	readonly default?: Record<string, unknown>;
	readonly examples?: Record<string, unknown>[];
	readonly additionalProperties?: false | JsonSchemaOrPrimitive;
};

export type ObjectJsonSchemaWithRequired = ObjectJsonSchemaWithoutRequired & {
	readonly required: readonly string[];
};

export type ObjectJsonSchema =
	| ObjectJsonSchemaWithoutRequired
	| ObjectJsonSchemaWithRequired;
