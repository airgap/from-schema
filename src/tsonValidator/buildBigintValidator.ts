import { BigIntTsonSchema } from '../tson/BigIntTsonSchema';

export function buildBigintValidator(schema: BigIntTsonSchema) {
	const checks: string[] = [];

	if (schema.minimum !== undefined) {
		// Convert bigint to string for code generation
		const minVal = schema.minimum.toString();
		checks.push(
			`if (value < BigInt("${minVal}")) ` +
				`return "Value must be greater than or equal to ${minVal}";`,
		);
	}

	if (schema.maximum !== undefined) {
		// Convert bigint to string for code generation
		const maxVal = schema.maximum.toString();
		checks.push(
			`if (value > BigInt("${maxVal}")) ` +
				`return "Value must be less than or equal to ${maxVal}";`,
		);
	}

	// Generate the validation function
	const functionBody = `
        if (typeof value !== "bigint") {
            // Try to convert string to bigint if possible
            if (typeof value === "string") {
                try {
                    value = BigInt(value);
                } catch {
                    return "Value must be a valid bigint";
                }
            } else {
                return "Value must be a bigint";
            }
        }
        ${checks.join('\n        ')}
        return undefined;
    `;

	return new Function('value', functionBody) as (
		value: unknown,
	) => string | undefined;
}
