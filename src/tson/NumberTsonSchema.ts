import { SchemaBase } from '../generic';

export type NumberTsonSchema = SchemaBase & {
	readonly type: 'number' | 'integer' | 'bigint' | 'double';
	readonly minimum?: number;
	readonly maximum?: number;
	readonly default?: number;
	readonly examples?: number[];
};
