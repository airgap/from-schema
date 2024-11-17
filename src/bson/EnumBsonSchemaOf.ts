import { SchemaBase } from '../generic/SchemaBase';
import { EnumBsonMember } from './EnumBsonSchema';

export type EnumBsonSchemaOf<M extends EnumBsonMember> = SchemaBase & {
	readonly enum: readonly M[];
};
