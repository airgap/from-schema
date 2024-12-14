import { PostgresRecordModel } from '../postgres';
import { PostgresColumnModel } from '../postgres/PostgresColumnModel';
import { postgresColumnToKysely } from './postgresColumnToKysely';
export const postgresRecordToKysely = <S extends PostgresRecordModel>(
	s: S,
): string => {
	const properties = Object.entries(
		s.properties as Record<string, PostgresColumnModel>,
	);
	const required = 'required' in s ? s.required : [];
	return `{ ${properties.map(([k, v]) => `${k}${!required.includes(k) ? '?' : ''}: ${postgresColumnToKysely(v)}`).join('; ')} }`;
};
