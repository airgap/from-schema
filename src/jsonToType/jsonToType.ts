import { JsonSchemaOrPrimitive } from '../json/JsonSchemaOrPrimitive';

export const jsonToType = <S extends JsonSchemaOrPrimitive>(s: S): string => {
	if (typeof s === 'string') return `"${s}"`;
	if (typeof s === 'boolean') return s.toString();
	if (typeof s === 'number') return s.toString();
	if (typeof s === 'object') {
		if ('enum' in s) return `${s.enum.map((e) => jsonToType(e)).join(' | ')}`;
		if ('oneOf' in s)
			return `(${s.oneOf.map((e) => jsonToType(e)).join(' | ')})`;
		if ('allOf' in s)
			return `(${s.allOf.map((e) => jsonToType(e)).join(' & ')})`;
		if ('anyOf' in s)
			return `(${s.anyOf.map((e) => jsonToType(e)).join(' | ')})`;
		if ('type' in s) {
			switch (s.type) {
				case 'array':
					return `Array<${jsonToType(s.items as JsonSchemaOrPrimitive)}>`;
				case 'object': {
					const properties = Object.entries(
						s.properties as Record<string, JsonSchemaOrPrimitive>,
					);
					const required = 'required' in s ? s.required : [];
					return `{ ${properties.map(([k, v]) => `${k}${!required.includes(k) ? '?' : ''}: ${jsonToType(v)}`).join('; ')} }`;
				}
				case 'string':
					return `string`;
				case 'boolean':
					return `boolean`;
				case 'integer':
					return `number`;
				case 'number':
					return `number`;
				default:
					throw new Error(`Unknown type: ${s.type}`);
			}
		}
		throw new Error(`Unknown json object schema: ${s}`);
	}
	throw new Error(`Unknown bson schema type ${typeof s}: ${s}`);
};
