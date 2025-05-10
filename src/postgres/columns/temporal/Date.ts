import { PostgresColumnBase } from '../../PostgresColumnBase';

export type DateColumnModel = PostgresColumnBase & {
	readonly type: 'date';
};
