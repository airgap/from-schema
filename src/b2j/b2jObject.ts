import { BsonSchema, ObjectBsonSchema } from '../bson';
import { JsonSchema, ObjectJsonSchema } from '../json';
import { b2j } from './b2j';

export const b2jObject = <S extends ObjectBsonSchema>(s: S) => ({
	type: 'object',
	...('description' in s ? { description: s.description } : {}),
	properties: Object.fromEntries(
		Object.entries(s.properties).map(([k, v]): [string, JsonSchema] => [
			k,
			b2j(v as BsonSchema) as JsonSchema,
		]),
	),
	...('required' in s ? { required: s.required } : {}),
	...('minProperties' in s ? { minProperties: s.minProperties } : {}),
	...('maxProperties' in s ? { maxProperties: s.maxProperties } : {}),
	...('examples' in s ? { examples: s.examples } : {}),
});
