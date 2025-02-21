import { PostgresRecordModel } from '../postgres';
import { PostgresColumnModel } from '../postgres/PostgresColumnModel';
import { postgresColumnToType } from './postgresColumnToType';
export const postgresRecordToType = <S extends PostgresRecordModel>(
	s: S,
	insertable: boolean,
): string => {
	const properties = Object.entries(
		s.properties as Record<string, PostgresColumnModel>,
	);
	const required = 'required' in s ? s.required : [];
	return `{ ${properties
		.map(([k, v]) => {
			const insertableAndPrefilled =
				insertable && !('default' in v) && !('generated' in v);
			const optional = insertableAndPrefilled || !required.includes(k);
			return `${k}${optional ? '?' : ''}: ${postgresColumnToType(v)}`;
		})
		.join('; ')} }`;
};
