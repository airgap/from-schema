import { SchemaBase } from '../generic/SchemaBase';

export type ArrayJsonBSchema = SchemaBase & {
	readonly type: 'array';
	readonly items: unknown;
	readonly minItems?: number;
	readonly maxItems?: number;
	readonly default?: unknown[];
	readonly examples?: unknown[][];
};
