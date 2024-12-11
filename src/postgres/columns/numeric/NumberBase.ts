import { SchemaBase } from '../../../generic';

export type NumberBase = SchemaBase & {
	readonly minimum?: number;
	readonly maximum?: number;
	readonly exclusiveMinimum?: number;
	readonly exclusiveMaximum?: number;
	readonly multipleOf?: number;
	readonly examples?: number[];
	readonly default?: number | 'nextval';
};
