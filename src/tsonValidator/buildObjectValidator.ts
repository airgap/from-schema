import { ObjectTsonSchema } from '../tson/ObjectTsonSchema';
import { Validator } from '../Validator';
import { buildValidator } from './buildValidator';

export function buildObjectValidator(schema: ObjectTsonSchema): Validator {
	const propertyValidators: Record<string, Validator> = {};

	// Build validators for each property
	for (const [key, propSchema] of Object.entries(schema.properties || {})) {
		propertyValidators[key] = buildValidator(propSchema);
	}

	const requiredProps = 'required' in schema ? schema.required : [];
	const closureVars = { propertyValidators, requiredProps };

	// Fast throwing version
	const throwingBody = `
		if (typeof value !== 'object' || value === null) {
			throw new Error('Value must be an object');
		}

		// Check required properties
		for (const prop of requiredProps) {
			if (!(prop in value)) {
				throw new Error(\`Missing required property: \${prop}\`);
			}
		}

		// Validate each property
		for (const [key, validator] of Object.entries(propertyValidators)) {
			if (key in value) {
				validator.validateOrThrow(value[key]);
			}
		}
	`;

	// Fast single-error version
	const quickBody = `
		if (typeof value !== 'object' || value === null) {
			return 'Value must be an object';
		}

		// Check required properties
		for (const prop of requiredProps) {
			if (!(prop in value)) {
				return \`Missing required property: \${prop}\`;
			}
		}

		// Validate each property
		for (const [key, validator] of Object.entries(propertyValidators)) {
			if (key in value) {
				const result = validator.isValid(value[key]);
				if (result !== true) {
					return \`Property "\${key}": \${result}\`;
				}
			}
		}

		return true;
	`;

	// Collecting version
	const collectingBody = `
		const errors = [];
		
		if (typeof value !== 'object' || value === null) {
			return ['Value must be an object'];
		}

		// Check required properties
		for (const prop of requiredProps) {
			if (!(prop in value)) {
				errors.push(\`Missing required property: \${prop}\`);
			}
		}

		// Validate each property
		for (const [key, validator] of Object.entries(propertyValidators)) {
			if (key in value) {
				const propErrors = validator.validate(value[key]);
				for (const error of propErrors) {
					errors.push(\`Property "\${key}": \${error}\`);
				}
			}
		}

		return errors;
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
