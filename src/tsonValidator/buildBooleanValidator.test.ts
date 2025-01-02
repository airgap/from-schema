import { buildBooleanValidator } from './buildBooleanValidator';
import { BooleanTsonSchema } from '../tson/BooleanTsonSchema';

describe('buildBooleanValidator', () => {
	test('validates boolean type', () => {
		const validator = buildBooleanValidator({
			type: 'boolean',
		});

		expect(validator.isValid(true)).toBe(true);
		expect(validator.isValid(false)).toBe(true);
		expect(validator.isValid('true')).toBe('Expected boolean, got string');
		expect(validator.isValid(1)).toBe('Expected boolean, got number');
		expect(validator.isValid(null)).toBe('Expected boolean, got object');
	});

	test('handles default values', () => {
		const validator = buildBooleanValidator({
			type: 'boolean',
			default: true,
		});

		expect(validator.isValid(undefined)).toBe(true);
		expect(validator.isValid(true)).toBe(true);
		expect(validator.isValid(false)).toBe(true);
		expect(validator.isValid('true')).toBe('Expected boolean, got string');
	});

	test('collects all errors', () => {
		const validator = buildBooleanValidator({
			type: 'boolean',
		});

		expect(validator.validate(true)).toEqual([]);
		expect(validator.validate(false)).toEqual([]);
		expect(validator.validate('true')).toEqual([
			'Expected boolean, got string',
		]);
		expect(validator.validate(1)).toEqual(['Expected boolean, got number']);
	});

	test('throws errors', () => {
		const validator = buildBooleanValidator({
			type: 'boolean',
		});

		expect(() => validator.validateOrThrow(true)).not.toThrow();
		expect(() => validator.validateOrThrow(false)).not.toThrow();
		expect(() => validator.validateOrThrow('true')).toThrow(
			'Expected boolean, got string',
		);
		expect(() => validator.validateOrThrow(1)).toThrow(
			'Expected boolean, got number',
		);
	});

	test('returns default value when throwing', () => {
		const validator = buildBooleanValidator({
			type: 'boolean',
			default: true,
		});

		expect(validator.validateOrThrow(undefined)).toBe(true);
		expect(validator.validateOrThrow(true)).toBe(true);
		expect(validator.validateOrThrow(false)).toBe(false);
		expect(() => validator.validateOrThrow('true')).toThrow(
			'Expected boolean, got string',
		);
	});
});
