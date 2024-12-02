import { OneOfBsonSchema } from '../bson';
import { ExclusiveJsonSchema, JsonSchema } from '../json';
import { bsonToJson } from './bsonToJson';

export const oneOfBsonToJson = (
	schema: OneOfBsonSchema,
): ExclusiveJsonSchema => {
	return {
		oneOf: schema.oneOf.map((subSchema) => bsonToJson(subSchema)),
	};
};
