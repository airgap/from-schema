import { SchemaBase } from '../generic';

export type ObjectIdBsonSchema = SchemaBase & {
	readonly bsonType: 'objectId';
};
