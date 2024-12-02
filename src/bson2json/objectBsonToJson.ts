import { BsonSchema } from '../bson';
import { JsonSchema } from '../json';
import { bsonToJson } from './bsonToJson';
import { ObjectBsonSchema } from '../bson';
import { ObjectJsonSchema } from '../json';

export const objectBsonToJson = <S extends ObjectBsonSchema>(
	s: S,
): ObjectJsonSchema => ({
	type: 'object',
	...('description' in s ? { description: s.description } : {}),
	properties: Object.fromEntries(
		Object.entries(s.properties).map(([k, v]): [string, JsonSchema] => [
			k,
			bsonToJson(v as BsonSchema) as JsonSchema,
		]),
	),
	...('required' in s ? { required: s.required } : {}),
	...('minProperties' in s ? { minProperties: s.minProperties } : {}),
	...('maxProperties' in s ? { maxProperties: s.maxProperties } : {}),
	...('examples' in s
		? { examples: s.examples as Record<string, unknown>[] }
		: {}),
});
