import { NumberBase } from './NumberBase';

export type DoubleColumnModel = NumberBase & {
	readonly type: 'double precision' | 'float8';
};
