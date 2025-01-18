import { ArrayTsonSchema } from '../tson/ArrayTsonSchema';
import { ProtoValidator } from '../ProtoValidator';
import { buildValidator } from './buildValidator';
import { ValidationError } from './ValidationError';
import { alpha } from '../alpha';

export function buildArrayValidator(
	key: string,
	schema: ArrayTsonSchema,
): {
	validate: string;
	validateOrThrow: string;
	isValid: string;
} {
	const itemKey = alpha(key) + '_item';
	const itemValidator = buildValidator(itemKey, schema.items);

	// Collecting version
	const collectingBody = `
			if (!Array.isArray(${key})) {
				allErrors.push('Value must be an array');
			} else {
			${
				schema.minLength !== undefined
					? `
			if (${key}.length < ${schema.minLength}) {
				allErrors.push(\`Array length \${${key}.length} is less than minimum length ${schema.minLength}\`);
			}
			`
					: ''
			}
			${
				schema.maxLength !== undefined
					? `
			if (${key}.length > ${schema.maxLength}) {
				allErrors.push(\`Array length \${${key}.length} exceeds maximum length ${schema.maxLength}\`);
			}
			`
					: ''
			}
			for (let i = 0; i < ${key}.length; i++) {
			const ${itemKey} = ${key}[i];
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
			const ${itemKey} = ${key}[i];
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
				const ${itemKey} = ${key}[i];
				${itemValidator.isValid}
			}
	`;

	return {
		validate: collectingBody,
		validateOrThrow: throwingBody,
		isValid: quickBody,
	};
}
