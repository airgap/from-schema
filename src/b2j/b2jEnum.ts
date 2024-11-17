import { EnumBsonSchema } from '../bson';
import { EnumJsonSchema } from '../json';
import { b2j } from './b2j';

export const b2jEnum = (s: EnumBsonSchema): EnumJsonSchema => ({
	enum: s.enum.map((e) => b2j(e) as unknown as string | number),
});
