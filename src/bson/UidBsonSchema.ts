import { StringBsonSchema } from './StringBsonSchema';

export type UidBsonSchema = StringBsonSchema & {
	pattern: '^[0-9a-f]{24}$';
};
