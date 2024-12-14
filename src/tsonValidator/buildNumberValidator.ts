import { NumberTsonSchema } from '../tson/NumberTsonSchema';

export function buildNumberValidator(schema: NumberTsonSchema) {
	const checks: string[] = [];

	if (schema.minimum !== undefined) {
		checks.push(
			`if (value < ${schema.minimum}) ` +
				`return "Value must be greater than or equal to ${schema.minimum}";`,
		);
	}

	if (schema.maximum !== undefined) {
		checks.push(
			`if (value > ${schema.maximum}) ` +
				`return "Value must be less than or equal to ${schema.maximum}";`,
		);
	}

	// Generate the validation function
	const functionBody = `
        if (typeof value !== "number") {
            // Try to convert string to number if possible
            if (typeof value === "string") {
                const num = Number(value);
                if (!Number.isNaN(num)) {
                    value = num;
                } else {
                    return "Value must be a valid number";
                }
            } else {
                return "Value must be a number";
            }
        }
        
        ${
					schema.type === 'integer'
						? `
        if (!Number.isInteger(value)) {
            return "Value must be an integer";
        }
        `
						: ''
				}

        ${checks.join('\n        ')}
        return undefined;
    `;

	return new Function('value', functionBody) as (
		value: unknown,
	) => string | undefined;
}
