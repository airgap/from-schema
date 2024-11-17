import { SchemaBase } from '../generic';

export type StringJsonSchema = SchemaBase & {
	readonly type: 'string';
	readonly format?: string;
	readonly minLength?: number;
	readonly maxLength?: number;
	// Regular expression, e.g. "^[A-Z][a-z]{1,9}$"
	readonly pattern?: string;
	readonly examples?: string[];
};
