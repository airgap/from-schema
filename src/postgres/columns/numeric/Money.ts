import { NumberBase } from './NumberBase';

export type MoneyColumnModel = NumberBase & {
	type: 'money';
};
