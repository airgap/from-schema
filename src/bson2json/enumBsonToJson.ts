import { EnumBsonSchema } from '../bson';
import { EnumJsonSchema } from '../json';
import { bsonToJson } from './bsonToJson';

export const enumBsonToJson = (s: EnumBsonSchema): EnumJsonSchema => ({
	enum: s.enum.map((e) => bsonToJson(e) as unknown as string | number),
});
