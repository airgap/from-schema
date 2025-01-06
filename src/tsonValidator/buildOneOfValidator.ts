import { OneOfTsonSchema } from '../tson/OneOfTsonSchema';
import { buildValidator } from './buildValidator';
import { ProtoValidator } from '../ProtoValidator';

export function buildOneOfValidator(schema: OneOfTsonSchema): {
	validate: string;
	validateOrThrow: string;
	isValid: string;
} {
	const validators = JSON.stringify(
		schema.oneOf.map((subSchema) => buildValidator(subSchema)),
	);

	const ERROR_MESSAGE = 'Value must match one of the allowed schemas';

	// Fast throwing version
	const throwingBody = `
        function(value: unknown): void {
            let anyMatch = false;
            
            for (const validator of ${validators}) {
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
        }
    `;

	// Fast single-error version
	const quickBody = `
        function(value: unknown): true | "${ERROR_MESSAGE}" {
            let anyMatch = false;
            
            for (const validator of ${validators}) {
                const result = validator.isValid(value);
                if (result === true) {
                    anyMatch = true;
                    break;
                }
            }
            
            return anyMatch ? true : "${ERROR_MESSAGE}";
        }
    `;

	// Collecting version
	const collectingBody = `
        function(value: unknown): string[] {
            let anyMatch = false;
            let allErrors = [];
            
            for (const validator of ${validators}) {
                const errors = validator.validate(value);
                if (errors.length === 0) {
                    anyMatch = true;
                    break;
                }
                allErrors = allErrors.concat(errors);
            }
            
            return anyMatch ? [] : ["${ERROR_MESSAGE}"];
        }
    `;

	return {
		validate: collectingBody,
		validateOrThrow: throwingBody,
		isValid: quickBody,
	};
}
