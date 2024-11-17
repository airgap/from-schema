import { NumberBsonSchemaBase } from './NumberBsonSchemaBase';

export type DoubleBsonSchema = NumberBsonSchemaBase & {
	readonly bsonType: 'double';
};
