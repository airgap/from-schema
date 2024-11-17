import { ArrayBsonSchema, BsonSchemaOrPrimitive } from '../bson';
import { ArrayJsonSchema } from '../json';
import { b2j } from './b2j';
import { stripBsonType } from './stripBsonType';

export const b2jArray = <S extends ArrayBsonSchema>(s: S): ArrayJsonSchema => ({
	type: 'array',
	...stripBsonType(s),
	items: b2j(s.items as BsonSchemaOrPrimitive),
});
