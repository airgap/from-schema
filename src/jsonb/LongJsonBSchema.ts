import { NumberJsonBSchemaBase as NumberJsonBSchemaBase } from './NumberJsonBSchemaBase';

export type LongJsonBSchema = NumberJsonBSchemaBase & {
	readonly type: 'long';
};
