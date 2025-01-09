import { ArrayTsonSchema } from '../tson/ArrayTsonSchema';
import { ProtoValidator } from '../ProtoValidator';
import { buildValidator } from './buildValidator';
import { ValidationError } from './ValidationError';

export function buildArrayValidator(
	key: string,
	schema: ArrayTsonSchema,
): {
	validate: string;
	validateOrThrow: string;
	isValid: string;
} {
	const itemValidator = buildValidator('item', schema.items);

	// Collecting version
	const collectingBody = `
			// Check if value is an array
			if (!Array.isArray(${key})) {
				allErrors.push('Value must be an array');
			} else {

			// Check minLength
			${
				schema.minLength !== undefined
					? `
			if (${key}.length < ${schema.minLength}) {
				allErrors.push(\`Array length \${${key}.length} is less than minimum length ${schema.minLength}\`);
			}
			`
					: ''
			}

			// Check maxLength
			${
				schema.maxLength !== undefined
					? `
			if (${key}.length > ${schema.maxLength}) {
				allErrors.push(\`Array length \${${key}.length} exceeds maximum length ${schema.maxLength}\`);
			}
			`
					: ''
			}

			// Validate each item
			for (let i = 0; i < ${key}.length; i++) {
			const item = ${key}[i];
			${itemValidator.validate}
			}
		}
	`;

	// Fast throwing version
	const throwingBody = `

			if (!Array.isArray(${key})) {
				throw new Error('Value must be an array');
			}

			${
				schema.minLength !== undefined
					? `
			if (${key}.length < ${schema.minLength}) {
				throw new Error(\`Array length \${${key}.length} is less than minimum length ${schema.minLength}\`);
			}
			`
					: ''
			}

			${
				schema.maxLength !== undefined
					? `
			if (${key}.length > ${schema.maxLength}) {
				throw new Error(\`Array length \${${key}.length} exceeds maximum length ${schema.maxLength}\`);
			}
			`
					: ''
			}

			for (let i = 0; i < ${key}.length; i++) {
			const item = ${key}[i];
				${itemValidator.validateOrThrow}
			}
	`;

	// Fast single-error version
	const quickBody = `
		
			if (!Array.isArray(${key})) {
				return 'Value must be an array';
			}

			${
				schema.minLength !== undefined
					? `
			if (${key}.length < ${schema.minLength}) {
				return \`Array length \${${key}.length} is less than minimum length ${schema.minLength}\`;
			}
			`
					: ''
			}

			${
				schema.maxLength !== undefined
					? `
			if (${key}.length > ${schema.maxLength}) {
				return \`Array length \${${key}.length} exceeds maximum length ${schema.maxLength}\`;
			}
			`
					: ''
			}

			for (let i = 0; i < ${key}.length; i++) {
				const item = ${key}[i];
				${itemValidator.isValid}
			}
	`;

	return {
		validate: collectingBody,
		validateOrThrow: throwingBody,
		isValid: quickBody,
	};
}
