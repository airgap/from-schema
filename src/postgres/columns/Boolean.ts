import { SchemaBase } from '../../generic/SchemaBase';

export type BooleanColumnModel = SchemaBase & {
	type: 'boolean';
	examples?: [true] | [false] | [true, false];
};
