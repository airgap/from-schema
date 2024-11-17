import { SchemaBase } from '../generic/SchemaBase';

export type ArrayBsonSchema = SchemaBase & {
	readonly bsonType: 'array';
	readonly items: unknown;
	readonly maxLength?: number;
	readonly minLength?: number;
	readonly default?: unknown[];
	readonly examples?: unknown[][];
};
