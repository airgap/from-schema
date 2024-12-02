import { ArrayBsonSchema, BsonSchemaOrPrimitive } from '../bson';
import { ArrayJsonSchema } from '../json';
import { bsonToJson } from './bsonToJson';
import { stripBsonType } from './stripBsonType';

export const arrayBsonToJson = <S extends ArrayBsonSchema>(
	s: S,
): ArrayJsonSchema => ({
	type: 'array',
	...stripBsonType(s),
	items: bsonToJson(s.items as BsonSchemaOrPrimitive),
});
