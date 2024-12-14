import { SchemaBase } from '../../../generic';

export type BigIntBase = SchemaBase & {
	readonly minimum?: bigint;
	readonly maximum?: bigint;
	readonly exclusiveMinimum?: bigint;
	readonly exclusiveMaximum?: bigint;
	readonly multipleOf?: bigint;
	readonly examples?: bigint[];
	readonly default?: bigint | 'nextval';
};
