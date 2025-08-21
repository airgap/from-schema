import { NumberBase } from './NumberBase';

export type IntegerColumnModel = NumberBase & {
	readonly type: 'integer' | 'int' | 'int2' | 'int4';
};
