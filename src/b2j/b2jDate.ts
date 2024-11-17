import { DateBsonSchema } from '../bson';
import { DateJsonSchema } from '../json';

export const b2jDate = (s: DateBsonSchema): DateJsonSchema => ({
	type: 'string',
	format: 'date-time',
});
