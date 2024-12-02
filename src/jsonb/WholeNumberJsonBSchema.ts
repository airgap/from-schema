import { LongJsonBSchema } from './LongJsonBSchema';

export type WholeNumberJsonBSchema = LongJsonBSchema & {
	minimum: 0;
};
