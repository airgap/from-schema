import { SchemaBase } from '../generic';
import { StringJsonBSchema } from './StringJsonBSchema';
import { NumberJsonBSchema } from './NumberJsonBSchema';

export type EnumJsonBMember =
	| string
	| number
	| StringJsonBSchema
	| NumberJsonBSchema;
export type EnumJsonBSchema = SchemaBase & {
	readonly enum: readonly EnumJsonBMember[];
};
