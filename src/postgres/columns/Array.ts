import { SchemaBase } from '../../generic/SchemaBase';
import { EnumJsonSchema } from '../../json';
import { PostgresColumnModel } from '../PostgresColumnModel';

export type ArrayColumnModel = SchemaBase & {
	readonly type: 'array';
	readonly items: PostgresColumnModel;
	readonly minItems?: number;
	readonly maxItems?: number;
};
