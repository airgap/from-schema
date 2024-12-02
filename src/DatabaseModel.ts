import { MongoCollectionModel } from './MongoCollectionModel';
import { ObjectBsonSchema } from './bson';

export type DatabaseModel<
	T extends Record<string, MongoCollectionModel<ObjectBsonSchema>>,
> = {
	type: 'database';
	tables: T;
};
