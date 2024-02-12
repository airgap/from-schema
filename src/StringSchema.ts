import { SchemaBase } from './SchemaBase';

export type StringSchema = SchemaBase & {
	readonly type: 'string';
	readonly minLength?: number;
	readonly maxLength?: number;
	readonly pattern?: string;
	readonly format?: string;
};
