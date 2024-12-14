import { BigIntBase } from './BigIntBase';

export type BigIntColumnModel = BigIntBase & {
	readonly type: 'bigint' | 'int8';
};
