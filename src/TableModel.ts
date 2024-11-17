import { ObjectBsonSchema, FromObjectBsonSchema } from './bson';

export type TableModel<S extends ObjectBsonSchema> = {
	readonly schema: S;
	readonly indexes?: readonly (
		| keyof S['properties']
		| { bond: readonly (keyof S['properties'])[] }
	)[];
	readonly docs?: FromObjectBsonSchema<S>[];
};
