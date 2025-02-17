import { FromObjectJsonSchema } from '../json';
import {
	FromPostgresRecordModel,
	PostgresRecordModel,
} from './PostgresRecordModel';

export type PostgresTableModel<S extends PostgresRecordModel> = {
	readonly schema: S;
	readonly indexes?: readonly (
		| keyof S['properties']
		| { bond: readonly (keyof S['properties'])[] }
	)[];
	readonly docs?: any[]; //FromPostgresRecordModel<S>[];
	readonly primaryKey?:
		| keyof S['properties']
		| readonly (keyof S['properties'])[];
	readonly foreignKeys?: Partial<
		Record<keyof S['properties'], { readonly [key: string]: string }>
	>;
};
