import { buildNumberValidator } from './buildNumberValidator';
import { NumberTsonSchema } from '../tson/NumberTsonSchema';
import { compileValidator } from './testUtils';

describe('buildNumberValidator', () => {
	describe('basic number validation', () => {
		const schema: NumberTsonSchema = { type: 'number' };
		const protoValidator = buildNumberValidator('value', schema);
		const validator = compileValidator(protoValidator);

		test('accepts valid numbers', () => {
			expect(validator.isValid(42)).toBe(true);
			expect(validator.isValid(3.14)).toBe(true);
			expect(validator.isValid(-10)).toBe(true);
		});

		test('accepts string numbers and converts them', () => {
			expect(validator.isValid('42')).toBe(true);
			expect(validator.isValid('-3.14')).toBe(true);
		});

		test('rejects invalid types', () => {
			expect(validator.isValid({})).toBe('Value must be a number');
			expect(validator.isValid([])).toBe('Value must be a number');
			expect(validator.isValid('abc')).toBe('Value must be a valid number');
			expect(validator.isValid(null)).toBe('Value must be a number');
		});
	});

	describe('integer validation', () => {
		const schema: NumberTsonSchema = { type: 'integer' };
		const protoValidator = buildNumberValidator('value', schema);
		const validator = compileValidator(protoValidator);

		test('accepts valid integers', () => {
			expect(validator.isValid(42)).toBe(true);
			expect(validator.isValid(-10)).toBe(true);
		});

		test('rejects decimals', () => {
			expect(validator.isValid(3.14)).toBe('Value must be an integer');
			expect(validator.isValid(-2.5)).toBe('Value must be an integer');
		});
	});

	describe('range validation', () => {
		const schema: NumberTsonSchema = {
			type: 'number',
			minimum: 0,
			maximum: 100,
		};
		const protoValidator = buildNumberValidator('value', schema);
		const validator = compileValidator(protoValidator);

		test('accepts numbers within range', () => {
			expect(validator.isValid(0)).toBe(true);
			expect(validator.isValid(50)).toBe(true);
			expect(validator.isValid(100)).toBe(true);
		});

		test('rejects numbers outside range', () => {
			expect(validator.isValid(-1)).toBe(
				'Value must be greater than or equal to 0',
			);
			expect(validator.isValid(101)).toBe(
				'Value must be less than or equal to 100',
			);
		});
	});

	describe('validateOrThrow', () => {
		const schema: NumberTsonSchema = {
			type: 'number',
			minimum: 0,
		};
		const protoValidator = buildNumberValidator('value', schema);
		const validator = compileValidator(protoValidator);

		test('throws error for invalid values', () => {
			expect(() => validator.validateOrThrow(-1)).toThrow(
				'Value must be greater than or equal to 0',
			);
			expect(() => validator.validateOrThrow('abc')).toThrow(
				'Value must be a valid number',
			);
		});

		test('does not throw for valid values', () => {
			expect(() => validator.validateOrThrow(42)).not.toThrow();
			expect(() => validator.validateOrThrow('123')).not.toThrow();
		});
	});

	describe('validate (collecting errors)', () => {
		const schema: NumberTsonSchema = {
			type: 'integer',
			minimum: 0,
			maximum: 10,
		};
		const protoValidator = buildNumberValidator('value', schema);
		const validator = compileValidator(protoValidator);

		test('returns empty array for valid values', () => {
			expect(validator.validate(5)).toEqual([]);
		});

		test('collects all validation errors', () => {
			expect(validator.validate('abc')).toEqual([
				'Value must be a valid number',
			]);
			expect(validator.validate(3.14)).toEqual(['Value must be an integer']);
			expect(validator.validate(-1)).toEqual([
				'Value must be greater than or equal to 0',
			]);
			expect(validator.validate(11)).toEqual([
				'Value must be less than or equal to 10',
			]);
		});
	});
});
