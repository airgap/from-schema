import { StringBsonSchema } from './StringBsonSchema';

export type EmailBsonSchema = StringBsonSchema & {
	format: 'email';
};
