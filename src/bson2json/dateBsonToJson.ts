import { DateBsonSchema } from '../bson';
import { DateJsonSchema } from '../json';

export const dateBsonToJson = (s: DateBsonSchema): DateJsonSchema => ({
	type: 'string',
	format: 'date-time',
});
