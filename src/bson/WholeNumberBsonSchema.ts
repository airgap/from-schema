import { LongBsonSchema } from './LongBsonSchema';
import { NumberBsonSchema } from './NumberBsonSchema';

export type WholeBsonSchema = LongBsonSchema & {
	minimum: 0;
};
