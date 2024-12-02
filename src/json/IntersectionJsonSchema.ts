import { SchemaBase } from '../generic';
import { JsonSchemaOrPrimitive } from './JsonSchemaOrPrimitive';

export type IntersectionJsonSchema = SchemaBase & {
	readonly allOf: readonly JsonSchemaOrPrimitive[];
	readonly description?: string;
	readonly default?: unknown;
	readonly examples?: unknown[];
};
