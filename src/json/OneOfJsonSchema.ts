import { SchemaBase } from '../generic/SchemaBase';
import { JsonSchemaOrPrimitive } from './JsonSchemaOrPrimitive';

// Schema for `oneOf` (exclusive union behavior)
export type OneOfJsonSchema = SchemaBase & {
	readonly oneOf: readonly JsonSchemaOrPrimitive[];
	readonly description?: string;
	readonly default?: unknown;
	readonly examples?: unknown[];
};
