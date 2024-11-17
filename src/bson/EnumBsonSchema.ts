import { SchemaBase } from '../generic';
import { StringBsonSchema } from './StringBsonSchema';
import { NumberBsonSchema } from './NumberBsonSchema';

export type EnumBsonMember =
	| string
	| number
	| StringBsonSchema
	| NumberBsonSchema;
export type EnumBsonSchema = SchemaBase & {
	readonly enum: readonly EnumBsonMember[];
};
