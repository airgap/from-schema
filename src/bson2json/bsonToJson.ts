import {
	ArrayBsonSchema,
	BsonSchema,
	BsonSchemaOrPrimitive,
	EnumBsonSchema,
	StringBsonSchema,
} from '../bson';
import { JsonSchema, JsonSchemaOrPrimitive } from '../json';
import { objectBsonToJson } from './objectBsonToJson';
import { stringBsonToJson } from './stringBsonToJson';
import { numberBsonToJson } from './numberBsonToJson';
import { arrayBsonToJson } from './arrayBsonToJson';
import { enumBsonToJson } from './enumBsonToJson';
import { booleanBsonToJson } from './booleanBsonToJson';
import { objectIdBsonToJson } from './objectIdBsonToJson';
import { dateBsonToJson } from './dateBsonToJson';
import { oneOfBsonToJson } from './oneOfBsonToJson';
import { b2jAllOf } from './allOfBsonToJson';
import { anyOfBsonToJson } from './anyOfBsonToJson';
import { OneOfBsonSchema, AllOfBsonSchema, AnyOfBsonSchema } from '../bson';
import { stringifyBON } from '../tson';

export const bsonToJson = <S extends BsonSchemaOrPrimitive>(
	s: S,
): JsonSchemaOrPrimitive => {
	if (typeof s === 'string') return s;
	if (typeof s === 'boolean') return s;
	if (typeof s === 'number') return s;
	if (typeof s === 'object') {
		if ('enum' in s) return enumBsonToJson(s as unknown as EnumBsonSchema);
		if ('oneOf' in s) return oneOfBsonToJson(s as unknown as OneOfBsonSchema);
		if ('allOf' in s) return b2jAllOf(s as unknown as AllOfBsonSchema);
		if ('anyOf' in s) return anyOfBsonToJson(s as unknown as AnyOfBsonSchema);
		if ('bsonType' in s) {
			switch (s.bsonType) {
				case 'array':
					return arrayBsonToJson(s as unknown as ArrayBsonSchema);
				case 'object':
					return objectBsonToJson(s) as JsonSchema;
				case 'string':
					return stringBsonToJson(s as unknown as StringBsonSchema);
				case 'decimal':
				case 'int':
				case 'long':
				case 'double':
					return numberBsonToJson(s);
				case 'bool':
					return booleanBsonToJson(s);
				case 'objectId':
					return objectIdBsonToJson(s);
				case 'date':
					return dateBsonToJson(s);
				default:
					throw new Error(`Unsupported bsonType: ${(s as any).bsonType}`);
			}
		}
		throw new Error(
			`Invalid BSON schema: object must have either "enum" or "bsonType" property: ${stringifyBON(s)}`,
		);
	}
	throw new Error('Invalid BSON schema: unexpected type');
};
