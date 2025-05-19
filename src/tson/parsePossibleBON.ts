import { parseBON } from './parseBON';

export const parsePossibleBON = <T>(
	input?: string | null,
): T | null | undefined =>
	typeof input === 'string' ? (parseBON(input) as T) : undefined;
