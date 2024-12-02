import { SchemaBase } from '../generic/SchemaBase';
import { JsonBSchemaOrPrimitive } from './JsonBSchemaOrPrimitive';

// Schema for `anyOf` (union-like behavior)
export type AnyOfJsonBSchema = SchemaBase & {
	readonly anyOf: readonly JsonBSchemaOrPrimitive[];
	readonly description?: string;
	readonly examples?: unknown[];
};
