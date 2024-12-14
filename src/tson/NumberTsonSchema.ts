import { SchemaBase } from '../generic';

export type NumberTsonSchema = SchemaBase & {
	readonly type: 'number' | 'integer';
	readonly minimum?: number;
	readonly maximum?: number;
	readonly default?: number;
	readonly examples?: number[];
};
