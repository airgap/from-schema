import { TsonSchemaOrPrimitive } from './tson/TsonSchemaOrPrimitive';

export const tsonToType = <S extends TsonSchemaOrPrimitive>(s: S): string => {
	if (typeof s === 'string') return `"${s}"`;
	if (typeof s === 'boolean') return s.toString();
	if (typeof s === 'number') return s.toString();
	if (typeof s === 'bigint') return s.toString();
	if (typeof s === 'object') {
		if ('enum' in s) return `${s.enum.map((e) => tsonToType(e)).join(' | ')}`;
		if ('oneOf' in s)
			return `(${s.oneOf.map((e) => tsonToType(e)).join(' | ')})`;
		if ('allOf' in s)
			return `(${s.allOf.map((e) => tsonToType(e)).join(' & ')})`;
		if ('anyOf' in s)
			return `(${s.anyOf.map((e) => tsonToType(e)).join(' | ')})`;
		if ('type' in s) {
			switch (s.type) {
				case 'array':
					return `Array<${tsonToType(s.items as TsonSchemaOrPrimitive)}>`;
				case 'object': {
					const properties = Object.entries(
						s.properties as Record<string, TsonSchemaOrPrimitive>,
					);
					const required = 'required' in s ? s.required : [];
					return `{ ${properties.map(([k, v]) => `${k}${!required.includes(k) ? '?' : ''}: ${tsonToType(v)}`).join('; ')} }`;
				}
				case 'string':
					return `string`;
				case 'boolean':
					return `boolean`;
				case 'integer':
				case 'double':
				case 'number':
					return `number`;
				case 'bigint':
					return `bigint`;
				case 'date':
					return `Date`;
				default:
					throw new Error(`Unknown type: ${s.type}`);
			}
		}
		throw new Error(`Unknown object schema: ${s}`);
	}
	throw new Error(`Unknown schema type ${typeof s}: ${s}`);
};
