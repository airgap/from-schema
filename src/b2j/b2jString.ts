import { StringBsonSchema } from '../bson';
import { StringJsonSchema } from '../json';
import { stripBsonType } from './stripBsonType';

export const b2jString = (s: StringBsonSchema): StringJsonSchema => ({
	type: 'string',
	...stripBsonType(s),
});
