import { SchemaBase } from '../generic/SchemaBase';

export type StringJsonBSchema = SchemaBase & {
	readonly type: 'string' | 'text';
	readonly minLength?: number;
	readonly maxLength?: number;
	// Regular expression, e.g. "^[A-Z][a-z]{1,9}$"
	readonly pattern?: string;
	readonly examples?: string[];
};
