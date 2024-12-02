import { NumberJsonBSchemaBase } from './NumberJsonBSchemaBase';

export type DoubleJsonBSchema = NumberJsonBSchemaBase & {
	readonly type: 'double' | 'double precision';
};
