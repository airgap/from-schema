import { SchemaBase } from './SchemaBase';

export type StringSchema = SchemaBase & {
	readonly type: 'string';
	readonly minLength?: number;
	readonly maxLength?: number;
	// Regular expression, e.g. "^[A-Z][a-z]{1,9}$"
	readonly pattern?: string;
	readonly format?: string;
};
