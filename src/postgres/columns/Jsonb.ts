import { SchemaBase } from '../../generic/SchemaBase';
import { EnumJsonSchema, JsonSchema } from '../../json';

export type JsonbColumnModel = SchemaBase & {
	readonly type: 'jsonb';
	readonly schema?: JsonSchema;
};
