import { PostgresColumnBase } from '../PostgresColumnBase';

export type BooleanColumnModel = PostgresColumnBase & {
	type: 'boolean' | 'bool';
	examples?: [true] | [false] | [true, false];
};
