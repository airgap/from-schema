import { SchemaBase } from '../generic';

export type DateBsonSchema = SchemaBase & {
	readonly bsonType: 'date';
	readonly minimum?: Date;
	readonly maximum?: Date;
};
