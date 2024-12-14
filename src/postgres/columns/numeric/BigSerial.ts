import { BigIntBase } from './BigIntBase';

export type BigSerialColumnModel = BigIntBase & {
	readonly type: 'bigserial' | 'serial8';
};
