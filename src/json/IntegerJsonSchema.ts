import { NumberSchemaBase } from '../generic';

export type IntegerJsonSchema = NumberSchemaBase & {
	type: 'integer';
};
