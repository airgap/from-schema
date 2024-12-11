import { SchemaBase } from '../generic';
import { TsonSchemaOrPrimitive } from './TsonSchemaOrPrimitive';

export type ArrayTsonSchema = SchemaBase & {
	readonly type: 'array';
	readonly items: TsonSchemaOrPrimitive;
	readonly maxLength?: number;
	readonly minLength?: number;
	readonly default?: unknown[];
	readonly examples?: unknown[][];
};
