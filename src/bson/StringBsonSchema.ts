import { SchemaBase } from '../generic/SchemaBase';

export type StringBsonSchema = SchemaBase & {
	readonly bsonType: 'string';
	readonly minLength?: number;
	readonly maxLength?: number;
	// Regular expression, e.g. "^[A-Z][a-z]{1,9}$"
	readonly pattern?: string;
	readonly examples?: string[];
};
