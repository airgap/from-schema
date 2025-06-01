import { isValidDate } from './isDate';

type Token = {
	type:
		| 'string'
		| 'number'
		| 'bigint'
		| 'true'
		| 'false'
		| 'null'
		| 'undefined'
		| 'object_start'
		| 'object_end'
		| 'array_start'
		| 'array_end'
		| 'colon'
		| 'comma';
	value: string;
	position: number;
};

class ParseError extends Error {
	position: number;

	constructor(message: string, position: number) {
		super(`${message} at position ${position}`);
		this.position = position;
	}
}

// Configuration constants
const MAX_NESTING_DEPTH = 10000; // Maximum allowed nesting depth
const MAX_STRING_LENGTH = 100000000; // 100MB
const MAX_INPUT_LENGTH = 100000000; // 100MB

function tokenize(input: string): Token[] {
	const tokens: Token[] = [];
	let pos = 0;

	// Special case: ISO date string from stringifyBON (No quotes around dates)
	const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z/;
	if (isoDatePattern.test(input)) {
		tokens.push({ type: 'string', value: input, position: 0 });
		return tokens;
	}

	while (pos < input.length) {
		const char = input[pos];

		// Skip whitespace
		if (/\s/.test(char)) {
			pos++;
			continue;
		}

		// Handle structural tokens
		if (char === '{') {
			tokens.push({ type: 'object_start', value: '{', position: pos });
			pos++;
			continue;
		}

		if (char === '}') {
			tokens.push({ type: 'object_end', value: '}', position: pos });
			pos++;
			continue;
		}

		if (char === '[') {
			tokens.push({ type: 'array_start', value: '[', position: pos });
			pos++;
			continue;
		}

		if (char === ']') {
			tokens.push({ type: 'array_end', value: ']', position: pos });
			pos++;
			continue;
		}

		if (char === ':') {
			tokens.push({ type: 'colon', value: ':', position: pos });
			pos++;
			continue;
		}

		if (char === ',') {
			tokens.push({ type: 'comma', value: ',', position: pos });
			pos++;
			continue;
		}

		// Handle strings
		if (char === '"') {
			let value = '';
			let startPos = pos;
			pos++; // Skip opening quote

			while (pos < input.length) {
				const c = input[pos];

				if (c === '\\' && pos + 1 < input.length) {
					// Handle escape sequences
					const nextChar = input[pos + 1];
					if (nextChar === '"') {
						value += '"';
						pos += 2;
						continue;
					}
					// Preserve other escape sequences
					value += c + nextChar;
					pos += 2;
					continue;
				}

				if (c === '"') {
					pos++; // Skip closing quote
					break;
				}

				value += c;
				pos++;
			}

			tokens.push({ type: 'string', value, position: startPos });
			continue;
		}

		// Handle ISO date string pattern (no quotes) - for date values in objects or arrays
		const remainingInput = input.substring(pos);
		const dateMatch = remainingInput.match(isoDatePattern);

		if (dateMatch && dateMatch.index === 0) {
			const value = dateMatch[0];
			tokens.push({ type: 'string', value, position: pos });
			pos += value.length;
			continue;
		}

		// Handle literals (true, false, null, undefined)
		if (input.startsWith('true', pos)) {
			tokens.push({ type: 'true', value: 'true', position: pos });
			pos += 4;
			continue;
		}

		if (input.startsWith('false', pos)) {
			tokens.push({ type: 'false', value: 'false', position: pos });
			pos += 5;
			continue;
		}

		if (input.startsWith('null', pos)) {
			tokens.push({ type: 'null', value: 'null', position: pos });
			pos += 4;
			continue;
		}

		if (input.startsWith('undefined', pos)) {
			tokens.push({ type: 'undefined', value: 'undefined', position: pos });
			pos += 9;
			continue;
		}

		// Handle numbers and bigints
		if (/[\d.-]/.test(char)) {
			let numStr = '';
			let startPos = pos;
			let isBigInt = false;

			// Extract numeric part
			while (pos < input.length) {
				const c = input[pos];

				// Check for bigint notation
				if (c === 'n') {
					isBigInt = true;
					pos++;
					break;
				}

				// Valid number characters
				if (/[\d.e+-]/.test(c)) {
					numStr += c;
					pos++;
					continue;
				}

				break;
			}

			if (isBigInt) {
				tokens.push({ type: 'bigint', value: numStr, position: startPos });
			} else {
				tokens.push({ type: 'number', value: numStr, position: startPos });
			}
			continue;
		}

		// If we reach here, we found an unexpected character
		throw new ParseError(`Unexpected character '${char}'`, pos);
	}

	return tokens;
}

function parse(
	tokens: Token[],
	startIdx = 0,
	depth = 0,
): { value: unknown; nextIdx: number } {
	// Guard against excessive recursion
	if (depth > MAX_NESTING_DEPTH) {
		throw new ParseError(
			'Maximum nesting depth exceeded',
			tokens[startIdx]?.position || -1,
		);
	}

	if (startIdx >= tokens.length) {
		throw new ParseError('Unexpected end of input', -1);
	}

	const token = tokens[startIdx];

	switch (token.type) {
		case 'string':
			// Validate string length
			if (token.value.length > MAX_STRING_LENGTH) {
				throw new ParseError(
					`String length exceeds maximum allowed (${MAX_STRING_LENGTH})`,
					token.position,
				);
			}
			return { value: token.value, nextIdx: startIdx + 1 };

		case 'number': {
			// Validate number format
			const num = Number(token.value);
			if (!Number.isFinite(num) && !Number.isNaN(num)) {
				throw new ParseError(
					`Invalid number value: ${token.value}`,
					token.position,
				);
			}
			return { value: num, nextIdx: startIdx + 1 };
		}

		case 'bigint': {
			try {
				// Validate BigInt format
				const bigint = BigInt(token.value);
				return { value: bigint, nextIdx: startIdx + 1 };
			} catch (e) {
				throw new ParseError(
					`Invalid BigInt value: ${token.value}`,
					token.position,
				);
			}
		}

		case 'true':
			return { value: true, nextIdx: startIdx + 1 };

		case 'false':
			return { value: false, nextIdx: startIdx + 1 };

		case 'null':
			return { value: null, nextIdx: startIdx + 1 };

		case 'undefined':
			return { value: undefined, nextIdx: startIdx + 1 };

		case 'object_start': {
			let nextIdx = startIdx + 1;
			const result: Record<string, unknown> = {};
			let propertyCount = 0;

			// Empty object
			if (nextIdx < tokens.length && tokens[nextIdx].type === 'object_end') {
				return { value: {}, nextIdx: nextIdx + 1 };
			}

			// Parse key-value pairs
			while (nextIdx < tokens.length) {
				// Enforce a reasonable property count to prevent DoS
				if (propertyCount > 100000) {
					throw new ParseError(
						'Object contains too many properties',
						token.position,
					);
				}

				// Expect a string key
				if (tokens[nextIdx]?.type !== 'string') {
					throw new ParseError(
						`Expected string key, got ${tokens[nextIdx]?.type || 'undefined'}`,
						tokens[nextIdx]?.position || -1,
					);
				}

				const key = tokens[nextIdx].value;

				// Check for potentially dangerous property names
				if (
					key === '__proto__' ||
					key === 'constructor' ||
					key === 'prototype'
				) {
					throw new ParseError(
						`Potentially unsafe property name: ${key}`,
						tokens[nextIdx].position,
					);
				}

				nextIdx++;

				// Expect a colon
				if (nextIdx >= tokens.length || tokens[nextIdx]?.type !== 'colon') {
					throw new ParseError(
						'Expected ":"',
						nextIdx < tokens.length ? tokens[nextIdx]?.position || -1 : -1,
					);
				}
				nextIdx++;

				// Parse the value with increased depth
				const { value, nextIdx: newIdx } = parse(tokens, nextIdx, depth + 1);
				result[key] = value;
				nextIdx = newIdx;
				propertyCount++;

				// Check for comma or end of object
				if (nextIdx >= tokens.length) {
					throw new ParseError('Unexpected end of input', -1);
				}

				if (tokens[nextIdx]?.type === 'object_end') {
					return { value: result, nextIdx: nextIdx + 1 };
				}

				if (tokens[nextIdx]?.type !== 'comma') {
					throw new ParseError(
						`Expected "," or "}", got ${tokens[nextIdx]?.type || 'undefined'}`,
						tokens[nextIdx]?.position || -1,
					);
				}

				// Skip comma
				nextIdx++;
			}

			throw new ParseError('Unexpected end of input', -1);
		}

		case 'array_start': {
			let nextIdx = startIdx + 1;
			const result: unknown[] = [];

			// Empty array
			if (nextIdx < tokens.length && tokens[nextIdx]?.type === 'array_end') {
				return { value: [], nextIdx: nextIdx + 1 };
			}

			// Parse array elements
			while (nextIdx < tokens.length) {
				// Enforce a reasonable array length to prevent DoS
				if (result.length > 10000000) {
					// 10 million elements
					throw new ParseError(
						'Array contains too many elements',
						token.position,
					);
				}

				// Parse value with increased depth
				const { value, nextIdx: newIdx } = parse(tokens, nextIdx, depth + 1);
				result.push(value);
				nextIdx = newIdx;

				// Check for comma or end of array
				if (nextIdx >= tokens.length) {
					throw new ParseError('Unexpected end of input', -1);
				}

				if (tokens[nextIdx]?.type === 'array_end') {
					return { value: result, nextIdx: nextIdx + 1 };
				}

				if (tokens[nextIdx]?.type !== 'comma') {
					throw new ParseError(
						`Expected "," or "]", got ${tokens[nextIdx]?.type || 'undefined'}`,
						tokens[nextIdx]?.position || -1,
					);
				}

				// Skip comma
				nextIdx++;
			}

			throw new ParseError('Unexpected end of input', -1);
		}

		default:
			throw new ParseError(
				`Unexpected token type: ${token.type}`,
				token.position,
			);
	}
}

// Check if a string looks like an ISO date
function isISODateString(str: string): boolean {
	const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;
	return isoDatePattern.test(str);
}

// Post-process the parsed data to convert ISO date strings back to Date objects
function postProcess(value: unknown): unknown {
	if (value === null || value === undefined) {
		return value;
	}

	if (typeof value === 'string' && isISODateString(value)) {
		const date = new Date(value);
		if (isValidDate(date)) {
			return date;
		}
	}

	if (Array.isArray(value)) {
		return value.map(postProcess);
	}

	if (typeof value === 'object') {
		const result: Record<string, unknown> = {};
		for (const [key, val] of Object.entries(value)) {
			result[key] = postProcess(val);
		}
		return result;
	}

	return value;
}

/**
 * Parses a BON (JSON with BigInt support) string into a JavaScript value
 * @param input The BON string to parse
 * @returns The parsed JavaScript value
 * @throws Error if the input is invalid BON syntax or contains potentially harmful structures
 */
export const parseBON = <T>(input: string): T => {
	try {
		// Input validation
		if (input === undefined || input === null) {
			throw new Error('Input cannot be null or undefined');
		}

		if (typeof input !== 'string') {
			throw new Error('Input must be a string');
		}

		if (input.length === 0) {
			throw new Error('Empty input');
		}

		if (input.length > MAX_INPUT_LENGTH) {
			throw new Error(
				`Input exceeds maximum allowed length (${MAX_INPUT_LENGTH})`,
			);
		}

		// Check for potentially dangerous patterns before tokenizing
		// const dangerousPatterns = [
		// 	// Potential code execution via JS syntax
		// 	/\bfunction\s*\(/i,
		// 	/\beval\s*\(/i,
		// 	/\bnew\s+Function/i,
		// 	/\bsetTimeout\s*\(/i,
		// 	/\bsetInterval\s*\(/i,
		// 	/\bconstructor\s*\.\s*constructor/i,

		// 	// Script tags
		// 	/<script/i,

		// 	// HTML injection
		// 	/<\s*\/?\s*[a-z]+[^>]*>/i,

		// 	// SQL injection patterns
		// 	/'\s*--/i,
		// 	/'\s*OR\s+/i,
		// 	/'\s*;\s*DROP/i,

		// 	// Command injection
		// 	/\|\s*rm\s+-rf/i,
		// 	/\`[^`]*\`/,
		// 	/\$\([^)]*\)/,
		// ];

		// for (const pattern of dangerousPatterns) {
		// 	if (pattern.test(input)) {
		// 		throw new Error('Input contains potentially malicious patterns');
		// 	}
		// }

		// Tokenize and parse
		const tokens = tokenize(input);
		if (tokens.length === 0) {
			throw new Error('No valid tokens found in input');
		}

		const { value, nextIdx } = parse(tokens, 0, 0);

		// Ensure entire input was consumed
		if (nextIdx < tokens.length) {
			throw new ParseError(
				`Unexpected token after end of BON: ${tokens[nextIdx].type}`,
				tokens[nextIdx].position,
			);
		}

		// Post-process to handle dates
		return postProcess(value);
	} catch (error) {
		if (error instanceof ParseError) {
			throw new Error(`BON parse error: ${error.message}`);
		}
		throw error;
	}
};
