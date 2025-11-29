import { buildArrayValidator } from './buildArrayValidator';
import { ArrayTsonSchema } from '../tson/ArrayTsonSchema';
import { compileValidator } from './testUtils';

describe('buildArrayValidator', () => {
	describe('basic array validation', () => {
		const schema: ArrayTsonSchema = {
			type: 'array',
			items: { type: 'number' },
		};
		const protoValidator = buildArrayValidator('value', schema);
		const validator = compileValidator(protoValidator);

		test('validates valid arrays', () => {
			expect(validator.isValid([])).toBe(true);
			expect(validator.isValid([1, 2, 3])).toBe(true);
			expect(validator.validate([])).toEqual([]);
			expect(validator.validate([1, 2, 3])).toEqual([]);
		});

		test('rejects non-arrays', () => {
			expect(validator.isValid('not an array')).toBe('Value must be an array');
			expect(validator.isValid(123)).toBe('Value must be an array');
			expect(validator.isValid({})).toBe('Value must be an array');
			expect(validator.validate('not an array')).toEqual([
				'Value must be an array',
			]);
		});

		test('validates array items', () => {
			expect(validator.isValid(['not a number'])).toBe(
				'Invalid item at index 0: Value must be a valid number',
			);
			expect(
				validator.validate(['not a number', 123, 'also not a number']),
			).toEqual([
				'Invalid item at index 0: Value must be a valid number',
				'Invalid item at index 2: Value must be a valid number',
			]);
		});

		test('throws with validateOrThrow', () => {
			expect(() => validator.validateOrThrow([1, 2, 3])).not.toThrow();
			expect(() => validator.validateOrThrow('not an array')).toThrow(
				'Value must be an array',
			);
			expect(() => validator.validateOrThrow(['not a number'])).toThrow(
				'Invalid item at index 0: Value must be a valid number',
			);
		});
	});

	describe('length constraints', () => {
		const schema: ArrayTsonSchema = {
			type: 'array',
			items: { type: 'number' },
			minItems: 2,
			maxItems: 4,
		};
		const protoValidator = buildArrayValidator('value', schema);
		const validator = compileValidator(protoValidator);

		test('validates arrays within length constraints', () => {
			expect(validator.isValid([1, 2])).toBe(true);
			expect(validator.isValid([1, 2, 3])).toBe(true);
			expect(validator.isValid([1, 2, 3, 4])).toBe(true);
		});

		test('rejects arrays that are too short', () => {
			expect(validator.isValid([])).toBe(
				'Array length 0 is less than minimum length 2',
			);
			expect(validator.isValid([1])).toBe(
				'Array length 1 is less than minimum length 2',
			);
			expect(validator.validate([1])).toEqual([
				'Array length 1 is less than minimum length 2',
			]);
		});

		test('rejects arrays that are too long', () => {
			expect(validator.isValid([1, 2, 3, 4, 5])).toBe(
				'Array length 5 exceeds maximum length 4',
			);
			expect(validator.validate([1, 2, 3, 4, 5])).toEqual([
				'Array length 5 exceeds maximum length 4',
			]);
		});

		test('combines length and item validation errors', () => {
			expect(validator.validate(['a', 'b', 'c', 'd', 'e'])).toEqual([
				'Array length 5 exceeds maximum length 4',
				'Invalid item at index 0: Value must be a valid number',
				'Invalid item at index 1: Value must be a valid number',
				'Invalid item at index 2: Value must be a valid number',
				'Invalid item at index 3: Value must be a valid number',
				'Invalid item at index 4: Value must be a valid number',
			]);
		});
	});

	describe('nested array validation', () => {
		const schema: ArrayTsonSchema = {
			type: 'array',
			items: {
				type: 'array',
				items: { type: 'number' },
			},
		};
		const protoValidator = buildArrayValidator('value', schema);
		const validator = compileValidator(protoValidator);

		test('validates nested arrays', () => {
			expect(validator.isValid([])).toBe(true);
			expect(
				validator.isValid([
					[1, 2],
					[3, 4],
				]),
			).toBe(true);
			expect(
				validator.validate([
					[1, 2],
					[3, 4],
				]),
			).toEqual([]);
		});

		test('validates nested array items', () => {
			expect(validator.isValid([[1, 'not a number']])).toBe(
				'Invalid item at index 0: Invalid item at index 1: Value must be a valid number',
			);
			expect(
				validator.validate([[1, 'not a number'], ['also not a number']]),
			).toEqual([
				'Invalid item at index 0: Invalid item at index 1: Value must be a valid number',
				'Invalid item at index 1: Invalid item at index 0: Value must be a valid number',
			]);
		});
	});
});
