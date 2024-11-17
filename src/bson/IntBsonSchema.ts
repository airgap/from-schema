import { NumberBsonSchemaBase } from './NumberBsonSchemaBase';

export type IntBsonSchema = NumberBsonSchemaBase & {
	readonly bsonType: 'int';
};
