import { BooleanBsonSchema } from '../bson';
import { BooleanJsonSchema } from '../json';
import { stripBsonType } from './stripBsonType';

export const booleanBsonToJson = (s: BooleanBsonSchema): BooleanJsonSchema => ({
	type: 'boolean',
	...stripBsonType(s),
});
