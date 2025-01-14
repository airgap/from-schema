import { PostgresColumnBase } from '../../PostgresColumnBase';

export type NumberBase = PostgresColumnBase & {
	readonly minimum?: number;
	readonly maximum?: number;
	readonly exclusiveMinimum?: number;
	readonly exclusiveMaximum?: number;
	readonly multipleOf?: number;
	readonly examples?: number[];
	readonly default?: number | 'nextval';
};
