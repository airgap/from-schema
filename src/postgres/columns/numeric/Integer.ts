import { NumberBase } from './NumberBase';

export type IntegerColumnModel = NumberBase & {
	readonly type: 'integer' | 'int' | 'int4';
};
