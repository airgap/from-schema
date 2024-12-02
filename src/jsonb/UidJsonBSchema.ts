import { StringJsonBSchema } from './StringJsonBSchema';

export type UidJsonBSchema = StringJsonBSchema & {
	pattern: '^[0-9a-f]{24}$';
};
