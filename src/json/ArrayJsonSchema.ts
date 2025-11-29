import { SchemaBase } from '../generic';
import { JsonSchemaOrPrimitive } from './JsonSchemaOrPrimitive';

export type ArrayJsonSchema = SchemaBase & {
	readonly type: 'array';
	readonly items: JsonSchemaOrPrimitive;
	readonly maxItems?: number;
	readonly minItems?: number;
	readonly uniqueItems?: boolean;
	readonly default?: unknown[];
	readonly examples?: unknown[][];
};
