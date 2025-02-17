import { NumberBase } from './NumberBase';

export type BigSerialColumnModel = NumberBase<bigint> & {
	readonly type: 'bigserial' | 'serial8';
};
