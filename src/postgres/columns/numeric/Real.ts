import { NumberBase } from './NumberBase';

export type RealColumnModel = NumberBase & {
	readonly type: 'real' | 'float4';
};
