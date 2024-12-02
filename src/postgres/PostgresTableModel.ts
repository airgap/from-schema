import { ObjectJsonSchema, FromObjectJsonSchema } from '../json';

export type PostgresTableModel<S extends ObjectJsonSchema> = {
	readonly schema: S;
	readonly indexes?: readonly (
		| keyof S['properties']
		| { bond: readonly (keyof S['properties'])[] }
	)[];
	readonly docs?: FromObjectJsonSchema<S>[];
};
