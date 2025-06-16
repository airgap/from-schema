import { buildBigintValidator } from './buildBigintValidator';
import { BigIntTsonSchema } from '../tson/BigIntTsonSchema';
import { compileValidator } from './testUtils';

describe('buildBigintValidator', () => {
	describe('const validation', () => {
		const schema: BigIntTsonSchema = {
			type: 'bigint',
			const: BigInt(123),
		};
		const protoValidator = buildBigintValidator('value', schema);
		const validator = compileValidator(protoValidator);

		test('accepts exact const value', () => {
			expect(validator.isValid(BigInt(123))).toBe(true);
			expect(validator.isValid('123')).toBe(true);
			expect(validator.validate(BigInt(123))).toEqual([]);
			expect(() => validator.validateOrThrow(BigInt(123))).not.toThrow();
		});

		test('rejects different values', () => {
			expect(validator.isValid(BigInt(124))).toBe('Expected 123, got 124');
			expect(validator.validate(BigInt(124))).toEqual([
				'Expected 123, got 124',
			]);
			expect(() => validator.validateOrThrow(BigInt(124))).toThrow(
				'Expected 123, got 124',
			);
		});

		test('rejects non-bigint values', () => {
			expect(validator.isValid('not a bigint')).toBe('Value must be a bigint');
			expect(validator.validate('not a bigint')).toEqual([
				'Value must be a bigint',
			]);
			expect(() => validator.validateOrThrow('not a bigint')).toThrow(
				'Value must be a bigint',
			);
		});
	});

	test('validates bigint type', () => {
		const protoValidator = buildBigintValidator('value', {
			type: 'bigint',
		});
		const validator = compileValidator(protoValidator);

		expect(validator.isValid(BigInt(123))).toBe(true);
		expect(validator.isValid('123')).toBe(true);
		expect(validator.isValid('not a bigint')).toBe('Value must be a bigint');
		expect(validator.isValid(123)).toBe('Value must be a bigint');
		expect(validator.isValid(null)).toBe('Value must be a bigint');
	});

	test('validates minimum value', () => {
		const protoValidator = buildBigintValidator('value', {
			type: 'bigint',
			minimum: BigInt(100),
		});
		const validator = compileValidator(protoValidator);

		expect(validator.isValid(BigInt(100))).toBe(true);
		expect(validator.isValid(BigInt(101))).toBe(true);
		expect(validator.isValid(BigInt(99))).toBe(
			'Value must be greater than or equal to 100',
		);
		expect(validator.isValid('101')).toBe(true);
		expect(validator.isValid('99')).toBe(
			'Value must be greater than or equal to 100',
		);
	});

	test('validates maximum value', () => {
		const protoValidator = buildBigintValidator('value', {
			type: 'bigint',
			maximum: BigInt(100),
		});
		const validator = compileValidator(protoValidator);

		expect(validator.isValid(BigInt(100))).toBe(true);
		expect(validator.isValid(BigInt(99))).toBe(true);
		expect(validator.isValid(BigInt(101))).toBe(
			'Value must be less than or equal to 100',
		);
		expect(validator.isValid('99')).toBe(true);
		expect(validator.isValid('101')).toBe(
			'Value must be less than or equal to 100',
		);
	});

	test('validates range', () => {
		const protoValidator = buildBigintValidator('value', {
			type: 'bigint',
			minimum: BigInt(100),
			maximum: BigInt(200),
		});
		const validator = compileValidator(protoValidator);

		expect(validator.isValid(BigInt(100))).toBe(true);
		expect(validator.isValid(BigInt(150))).toBe(true);
		expect(validator.isValid(BigInt(200))).toBe(true);
		expect(validator.isValid(BigInt(99))).toBe(
			'Value must be greater than or equal to 100',
		);
		expect(validator.isValid(BigInt(201))).toBe(
			'Value must be less than or equal to 200',
		);
	});

	test('collects all errors', () => {
		const protoValidator = buildBigintValidator('value', {
			type: 'bigint',
			minimum: BigInt(100),
			maximum: BigInt(200),
		});
		const validator = compileValidator(protoValidator);

		expect(validator.validate('not a bigint')).toEqual([
			'Value must be a bigint',
		]);
		expect(validator.validate(123)).toEqual(['Value must be a bigint']);
		expect(validator.validate(BigInt(99))).toEqual([
			'Value must be greater than or equal to 100',
		]);
		expect(validator.validate(BigInt(201))).toEqual([
			'Value must be less than or equal to 200',
		]);
	});

	test('throws errors', () => {
		const protoValidator = buildBigintValidator('value', {
			type: 'bigint',
			minimum: BigInt(100),
			maximum: BigInt(200),
		});
		const validator = compileValidator(protoValidator);

		expect(() => validator.validateOrThrow('not a bigint')).toThrow(
			'Value must be a bigint',
		);
		expect(() => validator.validateOrThrow(123)).toThrow(
			'Value must be a bigint',
		);
		expect(() => validator.validateOrThrow(BigInt(99))).toThrow(
			'Value must be greater than or equal to 100',
		);
		expect(() => validator.validateOrThrow(BigInt(201))).toThrow(
			'Value must be less than or equal to 200',
		);
		expect(() => validator.validateOrThrow(BigInt(150))).not.toThrow();
	});
});
