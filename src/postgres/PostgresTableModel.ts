import { ObjectJsonSchema, FromObjectJsonSchema } from '../json';
import { PostgresColumnModel } from './PostgresColumnModel';

export type PostgresTableModel<
	S extends PostgresColumnModel,
	D extends PostgresTableModel<any, any>,
> = {
	readonly name: string;
	readonly schema: S;
	readonly indexes?: readonly (
		| keyof S['properties']
		| { bond: readonly (keyof S['properties'])[] }
	)[];
	readonly docs?: FromObjectJsonSchema<S>[];
	readonly primaryKey?: readonly (keyof S['properties'])[];
	readonly foreignKeys?: readonly Record<
		keyof S['properties'],
		{ [key in D['name']]: keyof D['schema']['properties'] }
	>[];
};
