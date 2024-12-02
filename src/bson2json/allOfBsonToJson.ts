import { AllOfBsonSchema } from '../bson';
import { IntersectionJsonSchema } from '../json';
import { bsonToJson } from './bsonToJson';

export const b2jAllOf = (schema: AllOfBsonSchema): IntersectionJsonSchema => {
	return {
		allOf: schema.allOf.map((subSchema) => bsonToJson(subSchema)),
	};
};
