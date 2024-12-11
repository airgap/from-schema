import { SchemaBase } from '../generic';

export type BooleanTsonSchema = SchemaBase & {
	readonly type: 'boolean';
	readonly default?: boolean;
	readonly examples?: [true, false] | [false, true] | [true] | [false] | [];
};
