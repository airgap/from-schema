import { postgresColumnToJson, PostgresRecordModel } from '.';
import { TsonSchema } from '../tson';
import { PostgresColumnModel } from './PostgresColumnModel';
import { postgresColumnToTson } from './postgresColumnToTson';
export const postgresRecordToTson = <S extends PostgresRecordModel>(
	s: S,
): TsonSchema => {
	// console.log('ppp', s)
	const properties = Object.entries(
		s.properties as Record<string, PostgresColumnModel>,
	);
	const required = 'required' in s ? s.required : [];
	return {
		type: 'object',
		properties: Object.fromEntries(
			properties.map(([k, v]) => [k, postgresColumnToTson(v)]),
		),
		required: required,
	};
};
