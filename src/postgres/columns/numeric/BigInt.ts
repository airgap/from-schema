import { NumberBase } from './NumberBase';

export type BigIntColumnModel = NumberBase & {
	readonly type: 'bigint' | 'int8';
};
