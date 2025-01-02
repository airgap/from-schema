import { SchemaBase } from '../generic';

type BooleanBase = SchemaBase & {
	readonly type: 'boolean';
};
type VariableBoolean = BooleanBase & {
	readonly examples?: [true, false] | [false, true] | [true] | [false] | [];
	readonly default?: boolean;
};
type ConstantBoolean = BooleanBase & {
	readonly const: boolean;
};
export type BooleanTsonSchema = SchemaBase &
	(VariableBoolean | ConstantBoolean);
