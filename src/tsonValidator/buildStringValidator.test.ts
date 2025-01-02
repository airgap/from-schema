import { StringTsonSchema } from '../tson/StringTsonSchema';
import { buildStringValidator } from './buildStringValidator';

describe('buildStringValidator', () => {
	describe('const validation', () => {
		const schema: StringTsonSchema = {
			type: 'string',
			const: 'hello',
		};
		const validator = buildStringValidator(schema);

		test('accepts exact const value', () => {
			expect(validator.isValid('hello')).toBe(true);
			expect(validator.validate('hello')).toEqual([]);
			expect(() => validator.validateOrThrow('hello')).not.toThrow();
		});

		test('rejects different values', () => {
			expect(validator.isValid('world')).toBe('Expected "hello", got "world"');
			expect(validator.validate('world')).toEqual([
				'Expected "hello", got "world"',
			]);
			expect(() => validator.validateOrThrow('world')).toThrow(
				'Expected "hello", got "world"',
			);
		});

		test('rejects non-string values', () => {
			expect(validator.isValid(123)).toBe('Value must be a string');
			expect(validator.validate(123)).toEqual(['Value must be a string']);
			expect(() => validator.validateOrThrow(123)).toThrow(
				'Value must be a string',
			);
		});
	});

	describe('format validation', () => {
		const formatTests = [
			['email', 'test@example.com', 'invalid-email'],
			['date', '2023-12-25', '2023/12/25'],
			['time', '13:45:30Z', 'invalid'],
			['date-time', '2023-12-25T12:00:00Z', '2023-12-25'],
			['hostname', 'example.com', 'invalid..hostname'],
			['ipv4', '192.168.1.1', '256.256.256.256'],
			['ipv6', '2001:0db8:85a3:0000:0000:8a2e:0370:7334', 'invalid'],
			['uri', 'https://example.com', 'invalid-uri'],
			['uuid', '123e4567-e89b-4d3c-a456-426614174000', 'invalid-uuid'],
		] as const;

		test.each(formatTests)('validates %s format', (format, valid, invalid) => {
			const validator = buildStringValidator({
				type: 'string',
				format: format,
			});

			expect(validator.isValid(valid)).toBe(true);
			expect(validator.isValid(invalid)).toBe(
				`String must be a valid ${format} format`,
			);
		});
	});

	describe('length validation', () => {
		const schema: StringTsonSchema = {
			type: 'string',
			minLength: 2,
			maxLength: 5,
		};
		const validator = buildStringValidator(schema);

		test('accepts strings within length constraints', () => {
			expect(validator.isValid('ab')).toBe(true);
			expect(validator.isValid('abc')).toBe(true);
			expect(validator.isValid('abcde')).toBe(true);
		});

		test('rejects strings that are too short', () => {
			expect(validator.isValid('a')).toBe(
				'String must be at least 2 characters long',
			);
		});

		test('rejects strings that are too long', () => {
			expect(validator.isValid('abcdef')).toBe(
				'String must be at most 5 characters long',
			);
		});
	});

	describe('pattern validation', () => {
		const schema: StringTsonSchema = {
			type: 'string',
			pattern: '^[A-Z][a-z]+$',
		};
		const validator = buildStringValidator(schema);

		test('accepts strings matching pattern', () => {
			expect(validator.isValid('Hello')).toBe(true);
			expect(validator.isValid('World')).toBe(true);
		});

		test('rejects strings not matching pattern', () => {
			expect(validator.isValid('hello')).toBe(
				'String must match pattern: ^[A-Z][a-z]+$',
			);
			expect(validator.isValid('HELLO')).toBe(
				'String must match pattern: ^[A-Z][a-z]+$',
			);
		});
	});

	describe('multiple validations', () => {
		const schema: StringTsonSchema = {
			type: 'string',
			minLength: 5,
			maxLength: 10,
			pattern: '^[A-Z][a-z]+$',
		};
		const validator = buildStringValidator(schema);

		test('collects all validation errors', () => {
			expect(validator.validate('hi')).toEqual([
				'String must be at least 5 characters long',
				'String must match pattern: ^[A-Z][a-z]+$',
			]);
		});
	});
});
