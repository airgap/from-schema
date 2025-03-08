import { postgresColumnToJson, PostgresRecordModel } from '.';
import { TsonSchema } from '../tson';
import { PostgresColumnModel } from './PostgresColumnModel';
import { postgresColumnToTson } from './postgresColumnToTson';
export const postgresRecordToTson = <S extends PostgresRecordModel>(
	s: S,
	insertable: boolean,
): TsonSchema => {
	const properties = Object.entries(
		s.properties as Record<string, PostgresColumnModel>,
	);
	const required = 'required' in s ? s.required : [];
	const reallyRequired = insertable ? required.filter(p => 'default' in s || 'generated' in s) : required;
	return {
		type: 'object',
		properties: Object.fromEntries(
			properties.map(([k, v]) => [k, postgresColumnToTson(v)]),
		),
		required: reallyRequired,
	};
};
