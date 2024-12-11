import { NumberBase } from './NumberBase';

export type SmallIntColumnModel = NumberBase & {
	readonly type: 'smallint' | 'int2';
};
