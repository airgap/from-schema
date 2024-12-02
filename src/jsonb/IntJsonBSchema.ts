import { NumberJsonBSchemaBase } from './NumberJsonBSchemaBase';

export type IntJsonBSchema = NumberJsonBSchemaBase & {
	readonly type: 'int' | 'integer';
};
