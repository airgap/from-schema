import { DecimalBsonSchema } from './DecimalBsonSchema';
import { DoubleBsonSchema } from './DoubleBsonSchema';
import { IntBsonSchema } from './IntBsonSchema';
import { LongBsonSchema } from './LongBsonSchema';

export type NumberBsonSchema =
	| IntBsonSchema
	| LongBsonSchema
	| DoubleBsonSchema
	| DecimalBsonSchema;
