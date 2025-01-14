import { PostgresColumnBase } from '../../PostgresColumnBase';

export type TimeColumnModel = PostgresColumnBase & {
	type: 'time';
	timezone?: boolean;
	precision?: number;
};
