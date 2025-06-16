import { EnumTsonSchema } from '../tson/EnumTsonSchema';
import { ProtoValidator } from '../ProtoValidator';

export function buildEnumValidator(
	key: string,
	schema: EnumTsonSchema,
): ProtoValidator {
	const hasDefault = 'default' in schema;
	const defaultValue = hasDefault ? JSON.stringify(schema.default) : undefined;
	const enumValues = schema.enum.map((v) => JSON.stringify(v)).join(', ');
	const enumJoinedStr = schema.enum.join(', ');

	return {
		isValid: `
            if (${key} === undefined) {
                ${hasDefault ? 'return true;' : 'return "Expected string, got undefined";'}
            } else if (typeof ${key} !== "string") {
                return "Expected string, got " + typeof ${key};
            } else if (![${enumValues}].includes(${key})) {
                return "Value must be one of: ${enumJoinedStr}";
            }`,

		validateOrThrow: `
            if (${key} === undefined) {
                ${hasDefault ? `return ${defaultValue};` : 'throw new Error("Expected string, got undefined");'}
            } else if (typeof ${key} !== "string") {
                throw new Error("Expected string, got " + typeof ${key});
            } else if (![${enumValues}].includes(${key})) {
                throw new Error("Value must be one of: ${enumJoinedStr}");
            } else {
                return ${key};
            }`,

		validate: `
            if (${key} === undefined) {
                ${hasDefault ? '' : 'allErrors.push("Expected string, got undefined");'}
            } else if (typeof ${key} !== "string") {
                allErrors.push("Expected string, got " + typeof ${key});
            } else if (![${enumValues}].includes(${key})) {
                allErrors.push("Value must be one of: ${enumJoinedStr}");
            }`,
	};
}
