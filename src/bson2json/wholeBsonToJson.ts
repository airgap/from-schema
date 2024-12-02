import { WholeNumberJsonSchema } from '../json';
import { WholeBsonSchema } from '../bson';
import { stripBsonType } from './stripBsonType';

export const wholeBsonToJson = (s: WholeBsonSchema): WholeNumberJsonSchema => ({
	type: 'number',
	...stripBsonType(s),
});
