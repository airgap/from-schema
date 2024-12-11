import { NumberBase } from './NumberBase';

export type BigSerialColumnModel = NumberBase & {
	readonly type: 'bigserial' | 'serial8';
};
