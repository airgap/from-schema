import { MongoCollectionModel } from './MongoCollectionModel';
import { ObjectBsonSchema } from './bson';

export type MongoDatabaseModel<
	T extends Record<string, MongoCollectionModel<ObjectBsonSchema>>,
> = {
	type: 'database';
	tables: T;
};
