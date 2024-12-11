import { PostgresRecordModelWithRequired } from './PostgresRecordModel';
export type RequiredPropOf<T extends PostgresRecordModelWithRequired> = Extract<
	keyof T['properties'],
	T['required'][number]
>;
