import { TimestampBase } from './TimestampBase';

export type Timestamptz = TimestampBase & {
	type: 'timestamptz';
}
