import { StringJsonBSchema } from './StringJsonBSchema';

export type UuidV5JsonBSchema = StringJsonBSchema & {
	pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';
};
