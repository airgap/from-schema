import { PostgresColumnBase } from '../../PostgresColumnBase';

export type NumberBase<T extends number | bigint = number> = PostgresColumnBase & {
	readonly minimum?: T;
	readonly maximum?: T;
	readonly exclusiveMinimum?: T;
	readonly exclusiveMaximum?: T;
	readonly multipleOf?: T;
	readonly examples?: T[];
	readonly default?: T | 'nextval';
};
