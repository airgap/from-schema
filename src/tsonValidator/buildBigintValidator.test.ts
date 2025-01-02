import { buildBigintValidator } from './buildBigintValidator';
import { BigIntTsonSchema } from '../tson/BigIntTsonSchema';

describe('buildBigintValidator', () => {
	test('validates bigint type', () => {
		const validator = buildBigintValidator({
			type: 'bigint',
		});

		expect(validator.isValid(BigInt(123))).toBe(true);
		expect(validator.isValid('123')).toBe(true);
		expect(validator.isValid('not a bigint')).toBe(
			'Value must be a valid bigint',
		);
		expect(validator.isValid(123)).toBe('Value must be a bigint');
		expect(validator.isValid(null)).toBe('Value must be a bigint');
	});

	test('validates minimum value', () => {
		const validator = buildBigintValidator({
			type: 'bigint',
			minimum: BigInt(100),
		});

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
		const validator = buildBigintValidator({
			type: 'bigint',
			maximum: BigInt(100),
		});

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
		const validator = buildBigintValidator({
			type: 'bigint',
			minimum: BigInt(100),
			maximum: BigInt(200),
		});

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
		const validator = buildBigintValidator({
			type: 'bigint',
			minimum: BigInt(100),
			maximum: BigInt(200),
		});

		expect(validator.validate('not a bigint')).toEqual([
			'Value must be a valid bigint',
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
		const validator = buildBigintValidator({
			type: 'bigint',
			minimum: BigInt(100),
			maximum: BigInt(200),
		});

		expect(() => validator.validateOrThrow('not a bigint')).toThrow(
			'Value must be a valid bigint',
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
