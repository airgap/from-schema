import { SchemaBase } from '../../generic/SchemaBase';
import { EnumJsonSchema } from '../../json';

export type EnumColumnModel = SchemaBase & {
	readonly type: 'enum';
	readonly enum: readonly string[];
};
