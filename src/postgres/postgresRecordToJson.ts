import { postgresColumnToJson, PostgresRecordModel } from '.';
import { JsonSchema } from '../json';
import { PostgresColumnModel } from './PostgresColumnModel';
export const postgresRecordToJson = <S extends PostgresRecordModel>(
	s: S,
): JsonSchema => {
	const properties = Object.entries(
		s.properties as Record<string, PostgresColumnModel>,
	);
	const required = 'required' in s ? s.required : [];
	return {
		type: 'object',
		properties: Object.fromEntries(
			properties.map(([k, v]) => [k, postgresColumnToJson(v)]),
		),
		required: required,
	};
};
