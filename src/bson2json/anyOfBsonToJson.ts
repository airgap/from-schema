import { AnyOfBsonSchema } from '../bson';
import { JsonSchema, UnionJsonSchema } from '../json';
import { bsonToJson } from './bsonToJson';

export const anyOfBsonToJson = (schema: AnyOfBsonSchema): UnionJsonSchema => {
	return {
		anyOf: schema.anyOf.map((subSchema) => bsonToJson(subSchema)),
	};
};
