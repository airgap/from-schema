import { SchemaBase } from '../../generic/SchemaBase';

export type BooleanColumnModel = SchemaBase & {
	type: 'boolean' | 'bool';
	examples?: [true] | [false] | [true, false];
};
