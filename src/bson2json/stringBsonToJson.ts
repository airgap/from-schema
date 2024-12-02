import { StringBsonSchema } from '../bson';
import { StringJsonSchema } from '../json';
import { stripBsonType } from './stripBsonType';

export const stringBsonToJson = (s: StringBsonSchema): StringJsonSchema => {
	const result = {
		type: 'string' as const,
		...s,
	};
	delete (result as any).bsonType;
	return result;
};
