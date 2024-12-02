import { BsonSchemaOrPrimitive } from '../bson/BsonSchemaOrPrimitive';

export const bsonToType = <S extends BsonSchemaOrPrimitive>(s: S): string => {
	if (typeof s === 'string') return `"${s}"`;
	if (typeof s === 'boolean') return s.toString();
	if (typeof s === 'number') return s.toString();
	if (typeof s === 'object') {
		if ('enum' in s) return `${s.enum.map((e) => bsonToType(e)).join(' | ')}`;
		if ('oneOf' in s)
			return `(${s.oneOf.map((e) => bsonToType(e)).join(' | ')})`;
		if ('allOf' in s)
			return `(${s.allOf.map((e) => bsonToType(e)).join(' & ')})`;
		if ('anyOf' in s)
			return `(${s.anyOf.map((e) => bsonToType(e)).join(' | ')})`;
		if ('bsonType' in s) {
			switch (s.bsonType) {
				case 'array':
					return `Array<${bsonToType(s.items as BsonSchemaOrPrimitive)}>`;
				case 'object': {
					const properties = Object.entries(
						s.properties as Record<string, BsonSchemaOrPrimitive>,
					);
					const required = 'required' in s ? s.required : [];
					return `{ ${properties.map(([k, v]) => `${k}${!required.includes(k) ? '?' : ''}: ${bsonToType(v)}`).join('; ')} }`;
				}
				case 'string':
					return `string`;
				case 'bool':
					return `boolean`;
				case 'int':
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
					throw new Error(`Unknown bsonType: ${s.bsonType}`);
			}
		}
		throw new Error(`Unknown object schema: ${s}`);
	}
	throw new Error(`Unknown schema type ${typeof s}: ${s}`);
};
