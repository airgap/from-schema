import { StringJsonSchema } from './StringJsonSchema';

export type UidJsonSchema = StringJsonSchema & {
	pattern: '^[0-9a-f]{24}$';
};
