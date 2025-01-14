import { PostgresColumnBase } from '../PostgresColumnBase';

export type ByteaColumnModel = PostgresColumnBase & {
	type: 'bytea';
};
