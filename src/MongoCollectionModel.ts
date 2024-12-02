import { ObjectBsonSchema, FromObjectBsonSchema } from './bson';

export type MongoCollectionModel<S extends ObjectBsonSchema> = {
	readonly schema: S;
	readonly indexes?: readonly (
		| keyof S['properties']
		| { bond: readonly (keyof S['properties'])[] }
	)[];
	readonly docs?: FromObjectBsonSchema<S>[];
};
