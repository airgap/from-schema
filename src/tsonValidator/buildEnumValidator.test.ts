import { buildEnumValidator } from './buildEnumValidator';
import { EnumTsonSchema } from '../tson/EnumTsonSchema';
import { compileValidator } from './testUtils';

describe('buildEnumValidator', () => {
	test('validates enum values', () => {
		const protoValidator = buildEnumValidator('value', {
			enum: ['red', 'green', 'blue'],
		});
		const validator = compileValidator(protoValidator);

		expect(validator.isValid('red')).toBe(true);
		expect(validator.isValid('green')).toBe(true);
		expect(validator.isValid('blue')).toBe(true);
		expect(validator.isValid('yellow')).toBe(
			'Value must be one of: red, green, blue',
		);
		expect(validator.isValid(123)).toBe('Expected string, got number');
		expect(validator.isValid(null)).toBe('Expected string, got object');
	});

	test('handles default values', () => {
		const protoValidator = buildEnumValidator('value', {
			enum: ['red', 'green', 'blue'],
			default: 'red',
		});
		const validator = compileValidator(protoValidator);

		expect(validator.isValid(undefined)).toBe(true);
		expect(validator.isValid('red')).toBe(true);
		expect(validator.isValid('yellow')).toBe(
			'Value must be one of: red, green, blue',
		);
	});

	test('validates case-sensitive values', () => {
		const protoValidator = buildEnumValidator('value', {
			enum: ['Red', 'Green', 'Blue'],
		});
		const validator = compileValidator(protoValidator);

		expect(validator.isValid('Red')).toBe(true);
		expect(validator.isValid('red')).toBe(
			'Value must be one of: Red, Green, Blue',
		);
	});

	test('collects all errors', () => {
		const protoValidator = buildEnumValidator('value', {
			enum: ['red', 'green', 'blue'],
		});
		const validator = compileValidator(protoValidator);

		expect(validator.validate('red')).toEqual([]);
		expect(validator.validate('yellow')).toEqual([
			'Value must be one of: red, green, blue',
		]);
		expect(validator.validate(123)).toEqual(['Expected string, got number']);
	});

	test('throws errors', () => {
		const protoValidator = buildEnumValidator('value', {
			enum: ['red', 'green', 'blue'],
		});
		const validator = compileValidator(protoValidator);

		expect(() => validator.validateOrThrow('red')).not.toThrow();
		expect(() => validator.validateOrThrow('yellow')).toThrow(
			'Value must be one of: red, green, blue',
		);
		expect(() => validator.validateOrThrow(123)).toThrow(
			'Expected string, got number',
		);
	});

	test('returns default value when throwing', () => {
		const protoValidator = buildEnumValidator('value', {
			enum: ['red', 'green', 'blue'],
			default: 'red',
		});
		const validator = compileValidator(protoValidator);

		expect(validator.validateOrThrow(undefined)).toBe('red');
		expect(validator.validateOrThrow('green')).toBe('green');
		expect(() => validator.validateOrThrow('yellow')).toThrow(
			'Value must be one of: red, green, blue',
		);
	});

	test('handles empty values array', () => {
		const protoValidator = buildEnumValidator('value', {
			enum: [],
		});
		const validator = compileValidator(protoValidator);

		expect(validator.isValid('anything')).toBe('Value must be one of: ');
		expect(validator.validate('anything')).toEqual(['Value must be one of: ']);
		expect(() => validator.validateOrThrow('anything')).toThrow(
			'Value must be one of: ',
		);
	});
});
