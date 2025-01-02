import { EnumTsonSchema } from '../tson/EnumTsonSchema';

export function buildEnumValidator(schema: EnumTsonSchema) {
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

	const validationBody = `{
        return (function() {
            ${defaultCheck}
            ${typeCheck}
            ${enumCheck}
            return true;
        })();
    }`;

	const throwingBody = `{
        const result = (function() {
            if (value === undefined && ${hasDefault}) {
                value = ${JSON.stringify(defaultValue)};
                return true;
            }
            ${typeCheck}
            ${enumCheck}
            return true;
        })();
        if (result !== true) {
            throw new Error(result);
        }
        return value;
    }`;

	const validateBody = `{
        const result = (function() {
            ${defaultCheck}
            ${typeCheck}
            ${enumCheck}
            return true;
        })();
        if (result !== true) {
            return [result];
        }
        return [];
    }`;

	return {
		validate: new Function('value', validateBody) as (
			value: unknown,
		) => string[],
		validateOrThrow: new Function('value', throwingBody) as (
			value: unknown,
		) => string,
		isValid: new Function('value', validationBody) as (
			value: unknown,
		) => true | string,
	};
}
