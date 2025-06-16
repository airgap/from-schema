import { OneOfTsonSchema } from '../tson/OneOfTsonSchema';
import { buildValidator } from './buildValidator';
import { ProtoValidator } from '../ProtoValidator';
import { alpha } from '../alpha';

export function buildOneOfValidator(
	key: string,
	schema: OneOfTsonSchema,
): {
	validate: string;
	validateOrThrow: string;
	isValid: string;
} {
	const validators = schema.oneOf.map((subSchema) =>
		buildValidator(key, subSchema),
	);

	const ERROR_MESSAGE = 'Value must match one of the allowed schemas';
	const b = alpha(key);
	// Fast throwing version
	const throwingBody = `
            let anyMatch_${b} = false;
            ${validators.reduce(
							(agg, validator, index) => `
                try {
                    ${validator.validateOrThrow};
                    anyMatch_${b} = true;
                } catch {${agg}}`,
							'',
						)}
            
            if (!anyMatch_${b}) {
                throw new Error("${ERROR_MESSAGE}");
            }
    `;

	// Fast single-error version
	const quickBody = `
            let anyMatch_${b} = false;

            ${validators
							.map(
								(validator, index) => `
                if (typeof (()=>{${validator.isValid}})() !== 'string') {
                    anyMatch_${b} = true;
                }`,
							)
							.join(' else ')}
            
           if(!anyMatch_${b}) return "${ERROR_MESSAGE}";
    `;

	// Collecting version
	const collectingBody = `
            let anyMatch_${b} = false;
            
            ${validators
							.map(
								(validator, index) => `
                {
                    const tempErrors = [];
                    {
                        let allErrors = tempErrors;
                        ${validator.validate}
                    }
                    if (tempErrors.length === 0) {
                        anyMatch_${b} = true;
                    }
                }
            `,
							)
							.join('')}
            
            if (!anyMatch_${b}) {
                allErrors.push("${ERROR_MESSAGE}");
            }
    `;

	return {
		validate: collectingBody,
		validateOrThrow: throwingBody,
		isValid: quickBody,
	};
}
