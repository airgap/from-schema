import { NumberBase } from './NumberBase';

export type SmallSerialColumnModel = NumberBase & {
	readonly type: 'smallserial' | 'serial2';
};
