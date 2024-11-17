import { SchemaBase } from '../generic';
import { JsonSchemaOrPrimitive } from './JsonSchemaOrPrimitive';

export type ArrayJsonSchema = SchemaBase & {
	readonly type: 'array';
	readonly items: JsonSchemaOrPrimitive;
	readonly maxLength?: number;
	readonly minLength?: number;
	readonly default?: unknown[];
	readonly examples?: unknown[][];
};
