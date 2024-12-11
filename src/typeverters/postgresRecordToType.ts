import { PostgresRecordModel } from '../postgres';
import { PostgresColumnModel } from '../postgres/PostgresColumnModel';
import { postgresColumnToType } from './postgresColumnToType';
export const postgresRecordToType = <S extends PostgresRecordModel>(
	s: S,
): string => {
	const properties = Object.entries(
		s.properties as Record<string, PostgresColumnModel>,
	);
	const required = 'required' in s ? s.required : [];
	return `{ ${properties.map(([k, v]) => `${k}${!required.includes(k) ? '?' : ''}: ${postgresColumnToType(v)}`).join('; ')} }`;
};
