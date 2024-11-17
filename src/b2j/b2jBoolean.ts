import { BooleanBsonSchema } from '../bson';
import { BooleanJsonSchema } from '../json';
import { stripBsonType } from './stripBsonType';

export const b2jBoolean = (s: BooleanBsonSchema): BooleanJsonSchema => ({
	type: 'boolean',
	...stripBsonType(s),
});
