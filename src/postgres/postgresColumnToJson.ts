import { JsonSchema } from '../json';
import { PostgresColumnModel } from '../postgres';

export const postgresColumnToJson = <S extends PostgresColumnModel>(
	s: S,
): JsonSchema => {
	if (!s.type) throw new Error(`erm ${JSON.stringify(s)}`);
	switch (s.type) {
		case 'enum':
			return s;
		case 'array':
			return { ...s, items: postgresColumnToJson(s.items) };
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
		case 'bigserial':
		case 'serial8':
		case 'serial':
		case 'serial4':
		case 'smallserial':
		case 'serial2':
		case 'numeric':
			return {
				...(s.minimum ? { minimum: Number(s.minimum) } : {}),
				...(s.maximum ? { maximum: Number(s.maximum) } : {}),
				...(s.exclusiveMinimum
					? { exclusiveMinimum: Number(s.exclusiveMinimum) }
					: {}),
				...(s.exclusiveMaximum
					? { exclusiveMaximum: Number(s.exclusiveMaximum) }
					: {}),
				...(s.multipleOf ? { multipleOf: Number(s.multipleOf) } : {}),
				type: 'number',
				default: s.default === 'nextval' ? -1 : Number(s.default),
			};
		case 'date':
		case 'timestamp':
		case 'timestamptz':
			return { ...s, type: 'string', format: 'date-time' };
		case 'jsonb':
			return s.schema ?? { type: 'object', properties: {}, required: [] };
		default:
			console.log('Invalid model', s);
			throw new Error(`Unknown type: ${s.type} on ${JSON.stringify(s)}`);
	}
};
