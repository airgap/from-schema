import { SchemaBase } from '../generic';

export type BooleanJsonBSchema = SchemaBase & {
	readonly type: 'boolean' | 'bool';
	readonly examples?: [true, false] | [false, true] | [true] | [false] | [];
};
