import { SchemaBase } from '../generic';

type BigIntBase = SchemaBase & {
	readonly type: 'bigint';
};
type VariableBigInt = BigIntBase & {
	readonly minimum?: bigint;
	readonly maximum?: bigint;
	readonly default?: bigint;
	readonly examples?: bigint[];
};
type ConstantBigInt = BigIntBase & {
	readonly const: bigint;
};
export type BigIntTsonSchema = SchemaBase & (VariableBigInt | ConstantBigInt);
