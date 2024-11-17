import { SchemaBase } from '../generic/SchemaBase';

export type ArrayBsonSchema = SchemaBase & {
	readonly bsonType: 'array';
	readonly items: unknown;
	readonly minItems?: number;
	readonly maxItems?: number;
	readonly default?: unknown[];
	readonly examples?: unknown[][];
};
