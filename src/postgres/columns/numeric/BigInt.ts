import { NumberBase } from './NumberBase';

export type BigIntColumnModel = NumberBase<bigint> & {
	readonly type: 'bigint' | 'int8';
};
