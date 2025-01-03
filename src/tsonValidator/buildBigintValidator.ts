import { BigIntTsonSchema } from '../tson/BigIntTsonSchema';
import { Validator } from '../Validator';

export function buildBigintValidator(schema: BigIntTsonSchema): Validator {
	// If const is set, only validate against that value
	if ('const' in schema) {
		const constValue = schema.const.toString();

		// Fast throwing version
		const throwingBody = `
			if (typeof value !== "bigint") {
				if (typeof value === "string") {
					try {
						value = BigInt(value);
					} catch {
						throw new Error("Value must be a bigint");
					}
				} else {
					throw new Error("Value must be a bigint");
				}
			}
			if (value !== BigInt("${constValue}")) throw new Error("Expected ${constValue}, got " + value);
		`;

		// Fast single-error version
		const quickBody = `
			if (typeof value !== "bigint") {
				if (typeof value === "string") {
					try {
						value = BigInt(value);
					} catch {
						return "Value must be a bigint";
					}
				} else {
					return "Value must be a bigint";
				}
			}
			if (value !== BigInt("${constValue}")) return "Expected ${constValue}, got " + value;
			return true;
		`;

		// Collecting version
		const collectingBody = `
			const errors = [];
			if (typeof value !== "bigint") {
				if (typeof value === "string") {
					try {
						value = BigInt(value);
					} catch {
						errors.push("Value must be a bigint");
						return errors;
					}
				} else {
					errors.push("Value must be a bigint");
					return errors;
				}
			}
			if (value !== BigInt("${constValue}")) errors.push("Expected ${constValue}, got " + value);
			return errors;
		`;

		return {
			validate: new Function('value', collectingBody) as (
				value: unknown,
			) => string[],
			validateOrThrow: new Function('value', throwingBody) as (
				value: unknown,
			) => void,
			isValid: new Function('value', quickBody) as (
				value: unknown,
			) => true | string,
		};
	}

	// Original validation logic for non-const bigints
	const checks: string[] = [];

	if (schema.minimum !== undefined) {
		const minVal = schema.minimum.toString();
		checks.push(
			`if (value < BigInt("${minVal}")) return "Value must be greater than or equal to ${minVal}";`,
		);
	}

	if (schema.maximum !== undefined) {
		const maxVal = schema.maximum.toString();
		checks.push(
			`if (value > BigInt("${maxVal}")) return "Value must be less than or equal to ${maxVal}";`,
		);
	}

	// Base validation logic for bigint type checking
	const typeCheck = `
		if (typeof value !== "bigint") {
			if (typeof value === "string") {
				try {
					value = BigInt(value);
				} catch {
					return "Value must be a bigint";
				}
			} else {
				return "Value must be a bigint";
			}
		}
	`;

	// Fast throwing version
	const throwingBody = `
		${typeCheck.replace(/return "(.*?)";/g, 'throw new Error("$1");')}
		${checks.map((check) => check.replace(/return "(.*?)";/g, 'throw new Error("$1");')).join('\n        ')}
	`;

	// Fast single-error version
	const quickBody = `
		${typeCheck}
		${checks.join('\n        ')}
		return true;
	`;

	// Collecting version
	const collectingBody = `
		const errors = [];
		${typeCheck.replace(/return "(.*?)";/g, 'errors.push("$1");')}
		${checks.map((check) => check.replace(/return "(.*?)";/g, 'errors.push("$1");')).join('\n        ')}
		return errors;
	`;

	return {
		validate: new Function('value', collectingBody) as (
			value: unknown,
		) => string[],
		validateOrThrow: new Function('value', throwingBody) as (
			value: unknown,
		) => void,
		isValid: new Function('value', quickBody) as (
			value: unknown,
		) => true | string,
	};
}
