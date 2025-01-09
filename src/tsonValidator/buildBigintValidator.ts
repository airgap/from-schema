import { BigIntTsonSchema } from '../tson/BigIntTsonSchema';

export function buildBigintValidator(
	key: string,
	schema: BigIntTsonSchema,
): {
	validate: string;
	validateOrThrow: string;
	isValid: string;
} {
	// If const is set, only validate against that value
	if ('const' in schema) {
		const constValue = schema.const;

		// Fast throwing version
		const throwingBody = `
			if (typeof ${key} !== "bigint") {
				throw new Error("Value must be a bigint");
			}
			if (${key} !== ${constValue}) throw new Error("Expected ${constValue}, got " + ${key});
		`;

		// Fast single-error version
		const quickBody = `
			if (typeof ${key} !== "bigint") {
				return "Value must be a bigint";
			}
			if (${key} !== ${constValue}) return "Expected ${constValue}, got " + ${key};
		`;

		// Collecting version
		const collectingBody = `
			if (typeof ${key} !== "bigint") {
				allErrors.push("Value must be a bigint");
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
			`if (${key} < ${minVal}) return "Value must be greater than or equal to ${minVal}";`,
		);
	}

	if (schema.maximum !== undefined) {
		const maxVal = schema.maximum.toString();
		checks.push(
			`if (${key} > BigInt("${maxVal}")) return "Value must be less than or equal to ${maxVal}";`,
		);
	}

	// Base validation logic for bigint type checking
	const typeCheck = `
		if (typeof ${key} !== "bigint") {
			return "Value must be a bigint";
		}
	`;

	// Fast throwing version
	const throwingBody = `
			${typeCheck.replace(/return "(.*?)";/g, 'throw new Error("$1");')}
			${checks.map((check) => check.replace(/return "(.*?)";/g, 'throw new Error("$1");')).join('\n			')}
		
	`;

	// Fast single-error version
	const quickBody = `
			${typeCheck}
			${checks.join('\n			')}
	`;

	// Collecting version
	const collectingBody = `
			${typeCheck.replace(/return "(.*?)";/g, 'allErrors.push("$1");')}
			${checks.map((check) => check.replace(/return "(.*?)";/g, 'allErrors.push("$1");')).join('\n			')}
	`;

	return {
		validate: collectingBody,
		validateOrThrow: throwingBody,
		isValid: quickBody,
	};
}
