import { SchemaBase } from './SchemaBase';

export type NumberSchema = SchemaBase & {
	readonly type: 'number' | 'integer';
	readonly minimum?: number;
	readonly maximum?: number;
};
