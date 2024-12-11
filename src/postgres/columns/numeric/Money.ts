import { NumberBase } from './NumberBase';

export type MoneyColumnModel = NumberBase & {
	readonly type: 'money';
};
