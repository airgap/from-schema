import { PostgresColumnBase } from '../../PostgresColumnBase';

export type TimestampColumnModel = PostgresColumnBase & {
	type: 'timestamp' | 'timestamptz';
	timezone?: boolean;
	precision?: number;
};
