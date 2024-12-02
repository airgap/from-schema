import { NumberBsonSchema } from '../bson';
import { NumberJsonSchema } from '../json';
import { stripBsonType } from './stripBsonType';

export const numberBsonToJson = (s: NumberBsonSchema): NumberJsonSchema => ({
	type: 'number',
	...stripBsonType(s),
});
