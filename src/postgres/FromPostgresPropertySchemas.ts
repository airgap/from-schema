import { FromPostgresColumnModel } from './PostgresColumnModel';
import { PostgresRecordModel } from './PostgresRecordModel';

export type FromPostgresPropertySchemas<T extends PostgresRecordModel> = {
	-readonly [K in keyof T['properties']]: FromPostgresColumnModel<
		T['properties'][K]
	>;
};
