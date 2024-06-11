import { SchemaBase } from './SchemaBase';

export type BooleanSchema = SchemaBase & {
	readonly type: 'boolean';
	readonly default?: boolean;
	readonly examples?: [true, false] | [false, true] | [true] | [false] | [];
};
