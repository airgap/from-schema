import { PostgresRecordModel } from './PostgresRecordModel';
import { PostgresTableModel } from './PostgresTableModel';

export type PostgresDatabaseModel<
	T extends Record<string, PostgresTableModel<PostgresRecordModel>>,
> = {
	type: 'database';
	tables: T;
};
