import { StringJsonBSchema } from './StringJsonBSchema';

export type EmailJsonBSchema = StringJsonBSchema & {
	format: 'email';
};
