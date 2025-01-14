import { PostgresColumnBase } from '../../PostgresColumnBase';

export type DateColumnModel = PostgresColumnBase & {
	type: 'date';
};
