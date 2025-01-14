import { PostgresColumnBase } from '../../PostgresColumnBase';

export type BigIntBase = PostgresColumnBase & {
	readonly minimum?: bigint;
	readonly maximum?: bigint;
	readonly exclusiveMinimum?: bigint;
	readonly exclusiveMaximum?: bigint;
	readonly multipleOf?: bigint;
	readonly examples?: bigint[];
	readonly default?: bigint | 'nextval';
};
