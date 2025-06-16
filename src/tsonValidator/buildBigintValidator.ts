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
			let bigintValue = ${key};
			if (typeof ${key} === "string") {
				try {
					bigintValue = BigInt(${key});
				} catch {
					throw new Error("Value must be a bigint");
				}
			} else if (typeof ${key} !== "bigint") {
				throw new Error("Value must be a bigint");
			}
			if (bigintValue !== ${constValue}n) throw new Error("Expected ${constValue}, got " + bigintValue);
		`;

		// Fast single-error version
		const quickBody = `
			let bigintValue = ${key};
			if (typeof ${key} === "string") {
				try {
					bigintValue = BigInt(${key});
				} catch {
					return "Value must be a bigint";
				}
			} else if (typeof ${key} !== "bigint") {
				return "Value must be a bigint";
			}
			if (bigintValue !== ${constValue}n) return "Expected ${constValue}, got " + bigintValue;
		`;

		// Collecting version
		const collectingBody = `
			let bigintValue = ${key};
			let hasError = false;
			
			if (typeof ${key} === "string") {
				try {
					bigintValue = BigInt(${key});
				} catch {
					allErrors.push("Value must be a bigint");
					hasError = true;
				}
			} else if (typeof ${key} !== "bigint") {
				allErrors.push("Value must be a bigint");
				hasError = true;
			}
			
			if (!hasError && bigintValue !== ${constValue}n) {
				allErrors.push("Expected ${constValue}, got " + bigintValue);
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
			`if (bigintValue < ${minVal}n) return "Value must be greater than or equal to ${minVal}";`,
		);
	}

	if (schema.maximum !== undefined) {
		const maxVal = schema.maximum.toString();
		checks.push(
			`if (bigintValue > ${maxVal}n) return "Value must be less than or equal to ${maxVal}";`,
		);
	}

	// Base validation logic for bigint type checking
	const typeCheck = `
		let bigintValue = ${key};
		if (typeof ${key} === "string") {
			try {
				bigintValue = BigInt(${key});
			} catch {
				return "Value must be a bigint";
			}
		} else if (typeof ${key} !== "bigint") {
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
		let bigintValue = ${key};
		let hasError = false;
		
		if (typeof ${key} === "string") {
			try {
				bigintValue = BigInt(${key});
			} catch {
				allErrors.push("Value must be a bigint");
				hasError = true;
			}
		} else if (typeof ${key} !== "bigint") {
			allErrors.push("Value must be a bigint");
			hasError = true;
		}
		
		if (!hasError) {
			${checks
				.map((check) => {
					const modifiedCheck = check.replace(
						/return "(.*?)";/,
						'allErrors.push("$1");',
					);
					return modifiedCheck;
				})
				.join(' else ')}
		}
	`;

	return {
		validate: collectingBody,
		validateOrThrow: throwingBody,
		isValid: quickBody,
	};
}
