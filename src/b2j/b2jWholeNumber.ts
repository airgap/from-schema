import { WholeNumberJsonSchema } from '../json';
import { WholeNumberBsonSchema } from '../bson';
import { stripBsonType } from './stripBsonType';

export const b2jWholeNumber = (
	s: WholeNumberBsonSchema,
): WholeNumberJsonSchema => ({ type: 'number', ...stripBsonType(s) });
