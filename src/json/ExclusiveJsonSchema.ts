import { SchemaBase } from '../generic';
import { JsonSchemaOrPrimitive } from './JsonSchemaOrPrimitive';

export type ExclusiveJsonSchema = SchemaBase & {
	readonly oneOf: readonly JsonSchemaOrPrimitive[];
	readonly description?: string;
	readonly default?: unknown;
	readonly examples?: unknown[];
};

export type ExclusiveJsonSchemaOf<M extends JsonSchemaOrPrimitive> =
	SchemaBase & {
		readonly oneOf: readonly M[];
		readonly description?: string;
		readonly default?: unknown;
		readonly examples?: unknown[];
	};
