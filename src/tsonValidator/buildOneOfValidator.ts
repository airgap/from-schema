import { OneOfTsonSchema } from '../tson/OneOfTsonSchema';
import { buildValidator } from './buildValidator';
import { Validator } from '../Validator';

export function buildOneOfValidator(schema: OneOfTsonSchema): Validator {
	const validators = schema.oneOf.map((subSchema) => buildValidator(subSchema));
	const closureVars: Record<string, any> = {
		validators,
	};

	const ERROR_MESSAGE = 'Value must match one of the allowed schemas';

	// Fast throwing version
	const throwingBody = `
        let anyMatch = false;
        
        for (const validator of validators) {
            try {
                validator.validateOrThrow(value);
                anyMatch = true;
                break;
            } catch {
                // Continue to next validator
            }
        }
        
        if (!anyMatch) {
            throw new Error("${ERROR_MESSAGE}");
        }
    `;

	// Fast single-error version
	const quickBody = `
        // Track if any schema matched completely
        let anyMatch = false;
        
        // Try each schema validator
        for (const validator of validators) {
            const result = validator.isValid(value);
            if (result === true) {
                anyMatch = true;
                break;
            }
        }
        
        // Only return true if we found an exact match
        return anyMatch ? true : "${ERROR_MESSAGE}";
    `;

	// Collecting version
	const collectingBody = `
        let anyMatch = false;
        let allErrors = [];
        
        for (const validator of validators) {
            const errors = validator.validate(value);
            if (errors.length === 0) {
                anyMatch = true;
                break;
            }
            allErrors = allErrors.concat(errors);
        }
        
        return anyMatch ? [] : ["${ERROR_MESSAGE}"];
    `;

	return {
		validate: new Function(
			...Object.keys(closureVars),
			`return function validate(value) { ${collectingBody} }`,
		)(...Object.values(closureVars)) as (value: unknown) => string[],
		validateOrThrow: new Function(
			...Object.keys(closureVars),
			`return function validate(value) { ${throwingBody} }`,
		)(...Object.values(closureVars)) as (value: unknown) => void,
		isValid: new Function(
			...Object.keys(closureVars),
			`return function validate(value) { ${quickBody} }`,
		)(...Object.values(closureVars)) as (value: unknown) => true | string,
	};
}
