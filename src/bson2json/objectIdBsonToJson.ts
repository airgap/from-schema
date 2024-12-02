import { ObjectIdBsonSchema } from '../bson';
import { ObjectIdJsonSchema } from '../json';

export const objectIdBsonToJson = (
	s: ObjectIdBsonSchema,
): ObjectIdJsonSchema => ({
	type: 'string',
	pattern: '^[0-9a-f]{24}$',
});
