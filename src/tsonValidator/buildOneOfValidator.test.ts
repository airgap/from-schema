import { buildOneOfValidator } from './buildOneOfValidator';
import { OneOfTsonSchema } from '../tson/OneOfTsonSchema';
import { compileValidator } from './testUtils';

describe('buildOneOfValidator', () => {
	describe('basic oneOf validation', () => {
		const schema: OneOfTsonSchema = {
			oneOf: [{ type: 'string' }, { type: 'number' }],
		};
		const protoValidator = buildOneOfValidator('value', schema);
		const validator = compileValidator(protoValidator);

		test('accepts values matching any schema', () => {
			expect(validator.isValid('hello')).toBe(true);
			expect(validator.isValid(42)).toBe(true);
		});

		test('rejects values matching no schema', () => {
			expect(validator.isValid(true)).toBe(
				'Value must match one of the allowed schemas',
			);
			expect(validator.isValid(null)).toBe(
				'Value must match one of the allowed schemas',
			);
			expect(validator.isValid({})).toBe(
				'Value must match one of the allowed schemas',
			);
		});
	});

	describe('complex schema validation', () => {
		const schema: OneOfTsonSchema = {
			oneOf: [
				{
					type: 'object',
					properties: {
						type: { type: 'string', const: 'user' },
						name: { type: 'string' },
					},
					required: ['type', 'name'],
				},
				{
					type: 'object',
					properties: {
						type: { type: 'string', const: 'admin' },
						permissions: { type: 'array', items: { type: 'string' } },
					},
					required: ['type', 'permissions'],
				},
			],
		};
		const protoValidator = buildOneOfValidator('value', schema);
		const validator = compileValidator(protoValidator);

		test('accepts values matching first schema', () => {
			expect(
				validator.isValid({
					type: 'user',
					name: 'John',
				}),
			).toBe(true);
		});

		test('accepts values matching second schema', () => {
			expect(
				validator.isValid({
					type: 'admin',
					permissions: ['read', 'write'],
				}),
			).toBe(true);
		});

		test('rejects invalid values', () => {
			expect(
				validator.isValid({
					type: 'user',
					permissions: ['read'],
				}),
			).toBe('Value must match one of the allowed schemas');

			expect(
				validator.isValid({
					type: 'admin',
					name: 'John',
				}),
			).toBe('Value must match one of the allowed schemas');
		});
	});

	describe('validateOrThrow', () => {
		const schema: OneOfTsonSchema = {
			oneOf: [{ type: 'string' }, { type: 'number' }],
		};
		const protoValidator = buildOneOfValidator('value', schema);
		const validator = compileValidator(protoValidator);

		test('throws for invalid values', () => {
			expect(() => validator.validateOrThrow(true)).toThrow(
				'Value must match one of the allowed schemas',
			);
			expect(() => validator.validateOrThrow({})).toThrow(
				'Value must match one of the allowed schemas',
			);
		});

		test('does not throw for valid values', () => {
			expect(() => validator.validateOrThrow('test')).not.toThrow();
			expect(() => validator.validateOrThrow(42)).not.toThrow();
		});
	});

	describe('validate (collecting errors)', () => {
		const schema: OneOfTsonSchema = {
			oneOf: [
				{
					type: 'object',
					properties: { name: { type: 'string' } },
					required: ['name'],
				},
				{
					type: 'object',
					properties: { id: { type: 'number' } },
					required: ['id'],
				},
			],
		};
		const protoValidator = buildOneOfValidator('value', schema);
		const validator = compileValidator(protoValidator);

		test('returns empty array for valid values', () => {
			expect(validator.validate({ name: 'John' })).toEqual([]);
			expect(validator.validate({ id: 123 })).toEqual([]);
		});

		test('collects validation errors', () => {
			expect(validator.validate(null)).toEqual([
				'Value must match one of the allowed schemas',
			]);

			expect(validator.validate({ name: 42 })).toEqual([
				'Value must match one of the allowed schemas',
			]);

			expect(validator.validate({})).toEqual([
				'Value must match one of the allowed schemas',
			]);
		});
	});
});
