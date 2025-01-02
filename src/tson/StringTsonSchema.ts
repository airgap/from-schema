import { SchemaBase } from '../generic';

type StringBase = {
	readonly type: 'string';
};
type VariableString = StringBase & {
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
type ConstantString = StringBase & {
	readonly const: string;
};
export type StringTsonSchema = SchemaBase & (VariableString | ConstantString);
