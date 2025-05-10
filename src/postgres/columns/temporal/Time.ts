import { PostgresColumnBase } from '../../PostgresColumnBase';

export type TimeColumnModel = PostgresColumnBase & {
	readonly type: 'time';
	readonly timezone?: boolean;
	readonly precision?: number;
};
