import { EnumTsonSchema } from '../tson/EnumTsonSchema';
import { ProtoValidator } from '../ProtoValidator';

export function buildEnumValidator(
	key: string,
	schema: EnumTsonSchema,
): ProtoValidator {
	const hasDefault = 'default' in schema;
	const defaultValue = hasDefault ? schema.default : undefined;

	const enumCheck = `
        !(typeof ${key} === "string" && [${schema.enum.map((v) => JSON.stringify(v)).join(', ')}].includes(${key}))
    `;
	const err = `"Value must be one of: ${schema.enum.join(', ')}"`;

	const defaultCheck = hasDefault
		? `
        if (${key} === undefined) {
        } else
    `
		: '';

	return {
		isValid: `
            ${defaultCheck}
            if (${enumCheck})
                return ${err};`,

		validateOrThrow: `
            ${defaultCheck}
            if (${enumCheck})
                throw ${err};`,

		validate: `
            ${defaultCheck}
            if (${enumCheck})
                allErrors.push(${err});`,
	};
}
