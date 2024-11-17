import { NumberJsonSchema } from './NumberJsonSchema';

export type WholeNumberJsonSchema = NumberJsonSchema & {
	minimum: 0;
};
