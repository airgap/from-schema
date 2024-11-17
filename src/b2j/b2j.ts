import {
	ArrayBsonSchema,
	BsonSchema,
	BsonSchemaOrPrimitive,
	EnumBsonSchema,
	StringBsonSchema,
} from '../bson';
import { JsonSchema, JsonSchemaOrPrimitive } from '../json';
import { b2jObject } from './b2jObject';
import { b2jString } from './b2jString';
import { b2jNumber } from './b2jNumber';
import { b2jArray } from './b2jArray';
import { b2jEnum } from './b2jEnum';
import { b2jBoolean } from './b2jBoolean';
import { b2jObjectId } from './b2jObjectId';
import { b2jDate } from './b2jDate';

export const b2j = <S extends BsonSchemaOrPrimitive>(
	s: S,
): JsonSchemaOrPrimitive => {
	if (typeof s === 'string') return s;
	if (typeof s === 'boolean') return s;
	if (typeof s === 'number') return s;
	if (typeof s === 'object') {
		if ('enum' in s) return b2jEnum(s as unknown as EnumBsonSchema);
		if ('bsonType' in s) {
			switch (s.bsonType) {
				case 'array':
					return b2jArray(s as unknown as ArrayBsonSchema);
				case 'object':
					return b2jObject(s) as JsonSchema;
				case 'string':
					return b2jString(s as unknown as StringBsonSchema);
				case 'decimal':
					return b2jNumber(s);
				case 'int':
				case 'long':
				case 'double':
					return b2jNumber(s);
				case 'bool':
					return b2jBoolean(s);
				case 'objectId':
					return b2jObjectId(s);
				case 'date':
					return b2jDate(s);
				default:
					throw new Error(`Unsupported bsonType: ${(s as any).bsonType}`);
			}
		}
		throw new Error(
			'Invalid BSON schema: object must have either "enum" or "bsonType" property',
		);
	}
	throw new Error('Invalid BSON schema: unexpected type');
};
