import { SchemaBase } from '../generic';

export type BooleanJsonSchema = SchemaBase & {
	readonly type: 'boolean';
	readonly default?: boolean;
	readonly examples?: [true, false] | [false, true] | [true] | [false] | [];
};
