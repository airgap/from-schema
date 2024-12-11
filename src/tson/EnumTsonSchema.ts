import { SchemaBase } from '../generic';
import { StringTsonSchema } from './StringTsonSchema';
import { NumberTsonSchema } from './NumberTsonSchema';

export type EnumTsonSchemaMember =
	| string
	| number
	| StringTsonSchema
	| NumberTsonSchema;
export type EnumTsonSchema = SchemaBase & {
	readonly enum: readonly EnumTsonSchemaMember[];
};
