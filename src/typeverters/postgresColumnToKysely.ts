import { jsonToType } from '../jsonToType/jsonToType';
import { PostgresColumnModel } from '../postgres';

export const postgresColumnToKysely = <S extends PostgresColumnModel>(
	s: S,
): string => {
	console.log(s.type);
	switch (s.type) {
		case 'enum':
			console.log(s.enum);
			return `${s.enum.map((e) => `'${e}'`).join(' | ')}`;
		case 'array':
			return `Array<${postgresColumnToKysely(s.items)}>`;
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
		case 'bigserial':
		case 'serial8':
			return `Generated<bigint>`;
		case 'serial':
		case 'serial4':
		case 'serial2':
		case 'smallserial':
			return `Generated<number>`;
		case 'date':
		case 'timestamp':
		case 'timestamptz':
			return `Date`;
		case 'jsonb':
			return s.schema ? jsonToType(s.schema) : `unknown`;
		default:
			throw new Error(`Unknown type: ${s.type}`);
	}
};
