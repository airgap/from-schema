import { SchemaBase } from '../generic';

type NumberBase = SchemaBase & {
	readonly type: 'number' | 'integer';
};
type VariableNumber = NumberBase & {
	readonly minimum?: number;
	readonly maximum?: number;
	readonly default?: number;
	readonly examples?: number[];
};
type ConstantNumber = NumberBase & {
	readonly const: number;
};
export type NumberTsonSchema = SchemaBase & (VariableNumber | ConstantNumber);
