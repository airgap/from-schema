import { NumberBase } from './NumberBase';

export type SerialColumnModel = NumberBase & {
	readonly type: 'serial' | 'serial4';
};
