import { SchemaBase } from './SchemaBase';
type JsonStringBase = {
	readonly type: 'number' | 'integer';
};
type BsonStringBase = {
	readonly bsonType: 'int' | 'double';
};

export type NumberSchema = SchemaBase &
	(JsonStringBase | BsonStringBase) & {
		readonly minimum?: number;
		readonly maximum?: number;
		readonly default?: number;
		readonly examples?: number[];
	};
