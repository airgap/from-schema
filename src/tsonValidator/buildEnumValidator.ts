import { EnumTsonSchema } from '../tson/EnumTsonSchema';
import { ProtoValidator } from '../ProtoValidator';

export function buildEnumValidator(schema: EnumTsonSchema): ProtoValidator {
	const hasDefault = 'default' in schema;
	const defaultValue = hasDefault ? schema.default : undefined;

	const typeCheck = `
        if (typeof value !== "string") {
            return "Expected string, got " + (value === null ? "object" : typeof value);
        }
    `;

	const enumCheck = `
        if (![${schema.enum.map((v) => JSON.stringify(v)).join(', ')}].includes(value)) {
            return "Value must be one of: ${schema.enum.join(', ')}";
        }
    `;

	const defaultCheck = hasDefault
		? `
        if (value === undefined) {
            value = ${JSON.stringify(defaultValue)};
            return true;
        }
    `
		: '';

	return {
		isValid: `(value: unknown) => {
            ${defaultCheck}
            ${typeCheck}
            ${enumCheck}
            return true;
        }`,

		validateOrThrow: `(value: unknown) => {
            if (value === undefined && ${hasDefault}) {
                value = ${JSON.stringify(defaultValue)};
                return true;
            }
            ${typeCheck}
            ${enumCheck}
            return value;
        }`,

		validate: `(value: unknown) => {
            ${defaultCheck}
            ${typeCheck}
            ${enumCheck}
            return [];
        }`,
	};
}
