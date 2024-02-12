import { SchemaBase } from './SchemaBase';

export type BooleanSchema = SchemaBase & {
	readonly type: 'boolean';
};
