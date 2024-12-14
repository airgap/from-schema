import { SchemaBase } from '../generic';

export type NumberJsonSchema = SchemaBase & {
	readonly type: 'number' | 'integer';
	readonly minimum?: number;
	readonly maximum?: number;
	readonly exclusiveMinimum?: number;
	readonly exclusiveMaximum?: number;
	readonly multipleOf?: number;
	readonly default?: number;
	readonly examples?: number[];
};
