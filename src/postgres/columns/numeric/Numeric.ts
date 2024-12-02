import { NumberBase } from './NumberBase';

export type NumericColumnModel = NumberBase & {
	type: 'numeric';
	precision?: number;
	scale?: number;
};
