import { PostgresColumnBase } from '../../PostgresColumnBase';

export type TimestampBase = PostgresColumnBase & {
	timezone?: boolean;
	precision?: number;
	default?: Date | { sql: string };
	minimum?: Date;
	maximum?: Date;
	exclusiveMinimum?: Date;
	exclusiveMaximum?: Date;
};
