import { BigIntTsonSchema } from '../tson/BigIntTsonSchema';

export function buildBigintValidator(schema: BigIntTsonSchema): {
	validate: string;
	validateOrThrow: string;
	isValid: string;
} {
	// If const is set, only validate against that value
	if ('const' in schema) {
		const constValue = schema.const.toString();

		// Fast throwing version
		const throwingBody = `
			function(value: unknown) {
				if (typeof value !== "bigint") {
					throw new Error("Value must be a bigint");
				}
				if (value !== BigInt("${constValue}")) throw new Error("Expected ${constValue}, got " + value);
			}
		`;

		// Fast single-error version
		const quickBody = `
			function(value: unknown) {
				if (typeof value !== "bigint") {
					return "Value must be a bigint";
				}
				if (value !== BigInt("${constValue}")) return "Expected ${constValue}, got " + value;
				return true;
			}
		`;

		// Collecting version
		const collectingBody = `
			function(value: unknown) {
				const errors = [];
				if (typeof value !== "bigint") {
					errors.push("Value must be a bigint");
					return errors;
				}
				if (value !== BigInt("${constValue}")) errors.push("Expected ${constValue}, got " + value);
				return errors;
			}
		`;

		return {
			validate: collectingBody,
			validateOrThrow: throwingBody,
			isValid: quickBody,
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
			return "Value must be a bigint";
		}
	`;

	// Fast throwing version
	const throwingBody = `
		function(value: unknown) {
			${typeCheck.replace(/return "(.*?)";/g, 'throw new Error("$1");')}
			${checks.map((check) => check.replace(/return "(.*?)";/g, 'throw new Error("$1");')).join('\n			')}
		}
	`;

	// Fast single-error version
	const quickBody = `
		function(value: unknown) {
			${typeCheck}
			${checks.join('\n			')}
			return true;
		}
	`;

	// Collecting version
	const collectingBody = `
		function(value: unknown) {
			const errors = [];
			${typeCheck.replace(/return "(.*?)";/g, 'errors.push("$1");')}
			${checks.map((check) => check.replace(/return "(.*?)";/g, 'errors.push("$1");')).join('\n			')}
			return errors;
		}
	`;

	return {
		validate: collectingBody,
		validateOrThrow: throwingBody,
		isValid: quickBody,
	};
}
