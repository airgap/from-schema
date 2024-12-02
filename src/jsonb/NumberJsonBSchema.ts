import { DecimalJsonBSchema } from './DecimalBsonSchema';
import { DoubleJsonBSchema } from './DoubleJsonBSchema';
import { IntJsonBSchema } from './IntJsonBSchema';
import { LongJsonBSchema } from './LongJsonBSchema';

export type NumberJsonBSchema =
	| IntJsonBSchema
	| LongJsonBSchema
	| DoubleJsonBSchema
	| DecimalJsonBSchema;
