import { jsonToType } from '../jsonToType/jsonToType';
import { PostgresColumnModel } from '../postgres';

export const postgresColumnToType = <S extends PostgresColumnModel>(
	s: S,
): string => {
	switch (s.type) {
		case 'enum':
			return `${s.enum.join(' | ')}`;
		case 'array':
			return `Array<${postgresColumnToType(s.items)}>`;
		case 'char':
		case 'character':
		case 'bpchar':
		case 'text':
		case 'varchar':
		case 'character varying':
			return `string`;
		case 'bool':
		case 'boolean':
			return `boolean`;
		case 'int':
		case 'smallint':
		case 'int2':
		case 'bigint':
		case 'int4':
		case 'int8':
		case 'integer':
		case 'double precision':
		case 'float8':
		case 'money':
			return `number`;
		case 'date':
			return `Date`;
		case 'jsonb':
			return s.schema ? jsonToType(s.schema) : `unknown`;
		default:
			throw new Error(`Unknown type: ${s.type}`);
	}
};
