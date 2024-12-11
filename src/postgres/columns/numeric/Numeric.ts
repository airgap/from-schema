import { NumberBase } from './NumberBase';

export type NumericColumnModel = NumberBase & {
	readonly type: 'numeric';
	readonly precision?: number;
	readonly scale?: number;
};
