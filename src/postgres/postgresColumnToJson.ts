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
				minimum: s.minimum ? Number(s.minimum) : undefined,
				maximum: s.maximum ? Number(s.maximum) : undefined,
				exclusiveMinimum: s.exclusiveMinimum
					? Number(s.exclusiveMinimum)
					: undefined,
				exclusiveMaximum: s.exclusiveMaximum
					? Number(s.exclusiveMaximum)
					: undefined,
				multipleOf: s.multipleOf ? Number(s.multipleOf) : undefined,
				type: 'number',
				default: s.default === 'nextval' ? undefined : Number(s.default),
			};
		case 'date':
		case 'timestamp':
			return { ...s, type: 'string', format: 'date' };
		case 'jsonb':
			return s.schema ?? { type: 'object', properties: {}, required: [] };
		default:
			console.log('Invalid model', s);
			throw new Error(`Unknown type: ${s.type} on ${JSON.stringify(s)}`);
	}
};
