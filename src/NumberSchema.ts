import { SchemaBase } from './SchemaBase';
type JsonStringBase = {
	readonly type: 'integer' | 'number';
};
type BsonStringBase = {
	readonly bsonType: 'decimal' | 'double' | 'int' | 'long';
};

export type NumberSchema = SchemaBase &
	(JsonStringBase | BsonStringBase) & {
		readonly minimum?: number;
		readonly maximum?: number;
		readonly default?: number;
		readonly examples?: number[];
	};
