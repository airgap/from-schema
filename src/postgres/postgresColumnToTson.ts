import { PostgresColumnModel } from '.';
import { BigIntTsonSchema, TsonSchema } from '../tson';

export const postgresColumnToTson = <S extends PostgresColumnModel>(
	s: S,
): TsonSchema => {
	if (!s.type) throw new Error(`erm ${JSON.stringify(s)}`);
	switch (s.type) {
		case 'enum':
			return s;
		case 'array':
			return { ...s, items: postgresColumnToTson(s.items) };
		case 'char':
		case 'character':
		case 'bpchar':
		case 'text':
		case 'varchar':
		case 'character varying':
			return { ...s, type: 'string' };
		case 'bool':
		case 'boolean':
			return { ...s, type: 'boolean' };
		case 'int8':
		case 'bigint':
		case 'bigserial':
		case 'serial8':
			return {
				...s,
				type: 'bigint',
				...((s.default
					? { default: s.default === 'nextval' ? -1n : s.default }
					: {}) as any),
			} satisfies BigIntTsonSchema;
		case 'double precision':
		case 'float8':
		case 'int':
		case 'smallint':
		case 'int2':
		case 'int4':
		case 'integer':
		case 'money':
		case 'serial':
		case 'serial4':
		case 'smallserial':
		case 'serial2':
		case 'numeric':
			return {
				...s,
				type: 'number',
				...((typeof s.default !== 'undefined'
					? { default: s.default === 'nextval' ? -1 : s.default }
					: {}) as any),
			};
		case 'date':
		case 'timestamp':
			return { ...s, type: 'date' };
		case 'jsonb':
			return s.schema ?? { type: 'object', properties: {}, required: [] };
		default:
			console.log('Invalid model', s);
			throw new Error(`Unknown type: ${s.type} on ${JSON.stringify(s)}`);
	}
};
