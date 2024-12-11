import { SchemaBase } from '../generic';
import { FromPostgresPropertySchemas } from './FromPostgresPropertySchemas';
import {
	FromPostgresColumnModel,
	PostgresColumnModel,
} from './PostgresColumnModel';
import { RequiredPropOf } from './RequiredPropOf';

export type PostgresRecordModelWithoutRequired = SchemaBase & {
	readonly properties: Record<string, PostgresColumnModel>;
	readonly minProperties?: number;
	readonly maxProperties?: number;
	readonly default?: Record<string, unknown>;
	readonly examples?: Record<string, unknown>[];
	readonly additionalProperties?: false | PostgresColumnModel;
};

export type PostgresRecordModelWithRequired =
	PostgresRecordModelWithoutRequired & {
		readonly required: readonly string[];
	};

export type PostgresRecordModel =
	| PostgresRecordModelWithoutRequired
	| PostgresRecordModelWithRequired;

export type OnlyRequiredPostgres<T extends PostgresRecordModel> =
	T extends PostgresRecordModelWithRequired
		? Required<Pick<FromPostgresPropertySchemas<T>, RequiredPropOf<T>>>
		: Record<string, never>;

export type OnlyOptionalPostgres<T extends PostgresRecordModel> =
	T extends PostgresRecordModelWithRequired
		? Partial<Omit<FromPostgresPropertySchemas<T>, RequiredPropOf<T>>>
		: Record<string, never>;

export type FromPostgresRecordModel<S extends PostgresRecordModel> =
	OnlyRequiredPostgres<S> & OnlyOptionalPostgres<S>;
