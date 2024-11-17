import { LongBsonSchema } from './LongBsonSchema';
import { NumberBsonSchema } from './NumberBsonSchema';

export type WholeNumberBsonSchema = LongBsonSchema & {
	minimum: 0;
};
