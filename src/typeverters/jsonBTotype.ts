import { JsonBSchemaOrPrimitive } from '../jsonb/JsonBSchemaOrPrimitive';

export const jsonBToType = <S extends JsonBSchemaOrPrimitive>(s: S): string => {
	if (typeof s === 'string') return `"${s}"`;
	if (typeof s === 'boolean') return s.toString();
	if (typeof s === 'number') return s.toString();
	if (typeof s === 'object') {
		if ('enum' in s) return `${s.enum.map((e) => jsonBToType(e)).join(' | ')}`;
		if ('oneOf' in s)
			return `(${s.oneOf.map((e) => jsonBToType(e)).join(' | ')})`;
		if ('allOf' in s)
			return `(${s.allOf.map((e) => jsonBToType(e)).join(' & ')})`;
		if ('anyOf' in s)
			return `(${s.anyOf.map((e) => jsonBToType(e)).join(' | ')})`;
		if ('type' in s) {
			switch (s.type) {
				case 'array':
					return `Array<${jsonBToType(s.items as JsonBSchemaOrPrimitive)}>`;
				case 'object': {
					const properties = Object.entries(
						s.properties as Record<string, JsonBSchemaOrPrimitive>,
					);
					const required = 'required' in s ? s.required : [];
					return `{ ${properties.map(([k, v]) => `${k}${!required.includes(k) ? '?' : ''}: ${jsonBToType(v)}`).join('; ')} }`;
				}
				case 'string':
					return `string`;
				case 'text':
					return `string`;
				case 'bool':
					return `boolean`;
				case 'boolean':
					return `boolean`;
				case 'int':
					return `number`;
				case 'integer':
					return `number`;
				case 'long':
					return `number`;
				case 'double':
					return `number`;
				case 'decimal':
					return `number`;
				case 'date':
					return `Date`;
				default:
					throw new Error(`Unknown type: ${s.type}`);
			}
		}
		throw new Error(`Unknown JSONB object schema: ${s}`);
	}
	throw new Error(`Unknown JSONB schema type ${typeof s}: ${s}`);
};
