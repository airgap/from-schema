import { FromObjectJsonSchema } from '../json';
import {
	FromPostgresRecordModel,
	PostgresRecordModel,
} from './PostgresRecordModel';
import { PostgresTriggerModel } from './PostgresTriggerModel';
export type PropKeyOf<S extends PostgresRecordModel> = keyof S['properties'] &
	string;
export type Nulls =
	| ''
	| ' NULLS FIRST'
	| ' NULLS LAST'
	| ' nulls first'
	| ' nulls last';
export type Order = '' | ' ASC' | ' DESC' | ' asc' | ' desc';
export type Mods = `${Nulls}${Order}` | `${Order}${Nulls}`;
export type IndexColumn<S extends PostgresRecordModel> =
	| PropKeyOf<S>
	| `${PropKeyOf<S>}${Mods}`;
export type Columns<S extends PostgresRecordModel> =
	| IndexColumn<S>
	| readonly IndexColumn<S>[];
export type IndexesOf<S extends PostgresRecordModel> = readonly (
	| Columns<S>
	| {
			columns: Columns<S>;
			name?: string;
	  }
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
	readonly triggers?: readonly PostgresTriggerModel[];
	readonly unique?: keyof S['properties'] | readonly (keyof S['properties'])[];
};
