import { SchemaBase } from '../generic';
import { TsonSchemaOrPrimitive } from './TsonSchemaOrPrimitive';

export type ArrayTsonSchema = SchemaBase & {
	readonly type: 'array';
	readonly items: TsonSchemaOrPrimitive;
	readonly maxItems?: number;
	readonly minItems?: number;
	readonly uniqueItems?: boolean;
	readonly default?: unknown[];
	readonly examples?: unknown[][];
};
