import { FromObjectJsonSchema } from '../json';
import {
	FromPostgresRecordModel,
	PostgresRecordModel,
} from './PostgresRecordModel';
type P<S extends PostgresRecordModel> = keyof S['properties'];
type IndexesOf<S extends PostgresRecordModel> = readonly (
	| P<S>
	| P<S>[]
	| { columns: P<S> | readonly P<S>[]; name?: string }
)[];
export type PostgresTableModel<S extends PostgresRecordModel> = {
	readonly schema: S;
	readonly indexes?: IndexesOf<S>;
	readonly docs?: any[]; //FromPostgresRecordModel<S>[];
	readonly primaryKey?:
		| keyof S['properties']
		| readonly (keyof S['properties'])[];
	readonly foreignKeys?: Partial<
		Record<keyof S['properties'], { readonly [key: string]: string }>
	>;
};
