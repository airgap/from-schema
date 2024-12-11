import { SchemaBase } from '../generic';

export type StringTsonSchema = SchemaBase & {
	readonly type: 'string';
	readonly format?:
		| 'date'
		| 'time'
		| 'date-time'
		| 'email'
		| 'hostname'
		| 'ipv4'
		| 'ipv6'
		| 'uri'
		| 'uri-reference'
		| 'uuid'
		| 'uri-template'
		| 'json-pointer'
		| 'relative-json-pointer'
		| 'regex';
	readonly minLength?: number;
	readonly maxLength?: number;
	// Regular expression, e.g. "^[A-Z][a-z]{1,9}$"
	readonly pattern?: string;
	readonly examples?: string[];
};
