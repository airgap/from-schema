import { buildObjectValidator } from './buildObjectValidator';
import { ObjectTsonSchema } from '../tson/ObjectTsonSchema';

describe('buildObjectValidator', () => {
	describe('basic object validation', () => {
		const schema: ObjectTsonSchema = {
			type: 'object',
			properties: {
				name: { type: 'string' },
				age: { type: 'number' },
			},
		};
		const validator = buildObjectValidator(schema);

		test('accepts valid objects', () => {
			expect(validator.isValid({ name: 'John', age: 30 })).toBe(true);
			expect(validator.isValid({ name: 'Jane' })).toBe(true); // Optional properties
		});

		test('rejects invalid types', () => {
			expect(validator.isValid(null)).toBe('Value must be an object');
			expect(validator.isValid(42)).toBe('Value must be an object');
			expect(validator.isValid('test')).toBe('Value must be an object');
			expect(validator.isValid([])).toBe('Value must be an object');
		});

		test('validates property types', () => {
			expect(validator.isValid({ name: 42 })).toBe(
				'Property "name": Value must be a string',
			);
			expect(validator.isValid({ age: 'thirty' })).toBe(
				'Property "age": Value must be a valid number',
			);
		});
	});

	describe('required properties', () => {
		const schema: ObjectTsonSchema = {
			type: 'object',
			properties: {
				name: { type: 'string' },
				age: { type: 'number' },
			},
			required: ['name'],
		};
		const validator = buildObjectValidator(schema);

		test('accepts objects with required properties', () => {
			expect(validator.isValid({ name: 'John' })).toBe(true);
			expect(validator.isValid({ name: 'Jane', age: 25 })).toBe(true);
		});

		test('rejects objects missing required properties', () => {
			expect(validator.isValid({})).toBe('Missing required property: name');
			expect(validator.isValid({ age: 30 })).toBe(
				'Missing required property: name',
			);
		});
	});

	describe('nested objects', () => {
		const schema: ObjectTsonSchema = {
			type: 'object',
			properties: {
				person: {
					type: 'object',
					properties: {
						name: { type: 'string' },
						age: { type: 'number' },
					},
					required: ['name'],
				},
			},
			required: ['person'],
		};
		const validator = buildObjectValidator(schema);

		test('accepts valid nested objects', () => {
			expect(
				validator.isValid({
					person: { name: 'John', age: 30 },
				}),
			).toBe(true);
		});

		test('validates nested object properties', () => {
			expect(
				validator.isValid({
					person: { age: 30 },
				}),
			).toBe('Property "person": Missing required property: name');

			expect(
				validator.isValid({
					person: { name: 42 },
				}),
			).toBe('Property "person": Property "name": Value must be a string');
		});
	});

	describe('validateOrThrow', () => {
		const schema: ObjectTsonSchema = {
			type: 'object',
			properties: {
				name: { type: 'string' },
			},
			required: ['name'],
		};
		const validator = buildObjectValidator(schema);

		test('throws for invalid objects', () => {
			expect(() => validator.validateOrThrow(null)).toThrow(
				'Value must be an object',
			);
			expect(() => validator.validateOrThrow({})).toThrow(
				'Missing required property: name',
			);
			expect(() => validator.validateOrThrow({ name: 42 })).toThrow(
				'Property "name": Value must be a string',
			);
		});

		test('does not throw for valid objects', () => {
			expect(() => validator.validateOrThrow({ name: 'John' })).not.toThrow();
		});
	});

	describe('validate (collecting errors)', () => {
		const schema: ObjectTsonSchema = {
			type: 'object',
			properties: {
				name: { type: 'string' },
				age: { type: 'number' },
			},
			required: ['name', 'age'],
		};
		const validator = buildObjectValidator(schema);

		test('returns empty array for valid objects', () => {
			expect(validator.validate({ name: 'John', age: 30 })).toEqual([]);
		});

		test('collects all validation errors', () => {
			expect(validator.validate(null)).toEqual(['Value must be an object']);

			expect(validator.validate({})).toEqual([
				'Missing required property: name',
				'Missing required property: age',
			]);

			expect(
				validator.validate({
					name: 42,
					age: 'thirty',
				}),
			).toEqual([
				'Property "name": Value must be a string',
				'Property "age": Value must be a valid number',
			]);
		});
	});

	describe('bigint property validation', () => {
		const schema: ObjectTsonSchema = {
			type: 'object',
			properties: {
				id: { type: 'bigint' },
			},
			required: ['id'],
		};
		const validator = buildObjectValidator(schema);

		test('accepts valid bigint values', () => {
			expect(validator.isValid({ id: BigInt(123) })).toBe(true);
			expect(validator.validate({ id: BigInt(123) })).toEqual([]);
			expect(() =>
				validator.validateOrThrow({ id: BigInt(123) }),
			).not.toThrow();
		});

		test('accepts string representations of bigints', () => {
			expect(validator.isValid({ id: '123' })).toBe(true);
			expect(validator.validate({ id: '123' })).toEqual([]);
			expect(() => validator.validateOrThrow({ id: '123' })).not.toThrow();
		});

		test('rejects missing id', () => {
			expect(validator.isValid({})).toBe('Missing required property: id');
			expect(validator.validate({})).toEqual(['Missing required property: id']);
			expect(() => validator.validateOrThrow({})).toThrow(
				'Missing required property: id',
			);
		});

		test('rejects invalid bigint values', () => {
			const invalidValues = [
				{ id: 'not a number' },
				{ id: 123 }, // number instead of bigint
				{ id: true },
				{ id: {} },
				{ id: [] },
				{ id: null },
				{ id: undefined },
			];

			for (const value of invalidValues) {
				expect(validator.isValid(value)).toBe(
					'Property "id": Value must be a valid bigint',
				);
				expect(validator.validate(value)).toEqual([
					'Property "id": Value must be a bigint',
				]);
				expect(() => validator.validateOrThrow(value)).toThrow(
					'Property "id": Value must be a bigint',
				);
			}
		});

		test('rejects non-objects', () => {
			const invalidValues = [
				null,
				undefined,
				123,
				'string',
				true,
				[],
				BigInt(123),
			];

			for (const value of invalidValues) {
				expect(validator.isValid(value)).toBe('Value must be an object');
				expect(validator.validate(value)).toEqual(['Value must be an object']);
				expect(() => validator.validateOrThrow(value)).toThrow(
					'Value must be an object',
				);
			}
		});
	});
});
