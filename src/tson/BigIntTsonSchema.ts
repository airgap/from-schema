import { SchemaBase } from '../generic';

export type BigIntTsonSchema = SchemaBase & {
	readonly type: 'bigint';
	readonly minimum?: bigint;
	readonly maximum?: bigint;
	readonly default?: bigint;
	readonly examples?: bigint[];
};
