import { NumberBsonSchemaBase } from './NumberBsonSchemaBase';

export type LongBsonSchema = NumberBsonSchemaBase & {
	readonly bsonType: 'long';
};
