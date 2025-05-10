import { TimestampBase } from './TimestampBase';

export type Timestamptz = TimestampBase & {
	readonly type: 'timestamptz';
};
