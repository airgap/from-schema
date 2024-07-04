import { SchemaBase } from './SchemaBase';

export type JsonStringBase = {
	readonly type: 'string';
	readonly format?: string;
};
export type BsonStringBase = {
	readonly bsonType: 'string';
};

export type StringSchema = SchemaBase &
	(JsonStringBase | BsonStringBase) & {
		readonly minLength?: number;
		readonly maxLength?: number;
		// Regular expression, e.g. "^[A-Z][a-z]{1,9}$"
		readonly pattern?: string;
		readonly default?: string;
		readonly examples?: string[];
	};
