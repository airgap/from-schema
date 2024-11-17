import { SchemaBase } from '../generic';

export type NumberJsonSchema = SchemaBase & {
	readonly type: 'number';
	readonly minimum?: number;
	readonly maximum?: number;
	readonly default?: number;
	readonly examples?: number[];
};
