import { SchemaBase } from '../generic/SchemaBase';
import { JsonBSchemaOrPrimitive } from './JsonBSchemaOrPrimitive';

// Schema for `oneOf` (exclusive union behavior)
export type OneOfJsonBSchema = SchemaBase & {
	readonly oneOf: readonly JsonBSchemaOrPrimitive[];
	readonly description?: string;
	readonly examples?: unknown[];
};
