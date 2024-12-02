import { SchemaBase } from '../generic/SchemaBase';
import { JsonBSchemaOrPrimitive } from './JsonBSchemaOrPrimitive';

// Schema for `allOf` (intersection behavior)
export type AllOfJsonBSchema = SchemaBase & {
	readonly allOf: readonly JsonBSchemaOrPrimitive[];
	readonly description?: string;
	readonly examples?: unknown[];
};
