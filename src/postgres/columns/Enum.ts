import { SchemaBase } from '../../generic/SchemaBase';
import { EnumJsonSchema } from '../../json';

export type EnumColumnModel = SchemaBase &
	EnumJsonSchema & {
		readonly type: 'enum';
	};
