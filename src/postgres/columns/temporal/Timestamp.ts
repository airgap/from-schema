import { TimestampBase } from './TimestampBase';

export type Timestamp = TimestampBase & {
	readonly type: 'timestamp';
};
