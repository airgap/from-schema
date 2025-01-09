import { StringTsonSchema } from '../tson/StringTsonSchema';
import { ProtoValidator } from '../ProtoValidator';
import { StringFormats } from '../tson/StringFormats';

export function buildStringValidator(
	key: string,
	schema: StringTsonSchema,
): {
	validate: string;
	validateOrThrow: string;
	isValid: string;
} {
	// If const is set, only validate against that value
	if ('const' in schema) {
		const constValue = schema.const;

		// Fast throwing version
		const throwingBody = `
			if (typeof ${key} !== "string") throw new Error("Value must be a string");
			else if (${key} !== "${constValue}") throw new Error('Expected "${constValue}", got "' + ${key} + '"');
		`;

		// Fast single-error version
		const quickBody = `
			if (typeof ${key} !== "string") return "Value must be a string";
			else if (${key} !== "${constValue}") return 'Expected "${constValue}", got "' + ${key} + '"';
		`;

		// Collecting version
		const collectingBody = `
			if (typeof ${key} !== "string") {
				allErrors.push("Value must be a string");
			}
			else if (${key} !== "${constValue}") {
				allErrors.push('Expected "${constValue}", got "' + ${key} + '"');
			}
		`;

		return {
			validate: collectingBody,
			validateOrThrow: throwingBody,
			isValid: quickBody,
		};
	}

	// Original validation logic for non-const strings
	const checks: string[] = [];

	if (schema.minLength !== undefined) {
		checks.push(
			`if (${key}.length < ${schema.minLength}) ` +
				`return "String must be at least ${schema.minLength} characters long";`,
		);
	}

	if (schema.maxLength !== undefined) {
		checks.push(
			`if (${key}.length > ${schema.maxLength}) ` +
				`return "String must be at most ${schema.maxLength} characters long";`,
		);
	}

	if (schema.format !== undefined) {
		const pattern = StringFormats[schema.format];
		if (pattern) {
			const flags = pattern.toString().match(/\/([gimuy]*)$/)?.[1] || '';
			const patternStr = pattern
				.toString()
				.slice(1, -1 - (flags.length ? flags.length + 1 : 0))
				.replace(/\\/g, '\\\\')
				.replace(/"/g, '\\"')
				.replace(/\$/g, '\\$');
			checks.push(
				`if (!new RegExp("${patternStr}", "${flags}").test(${key})) return "String must be a valid ${schema.format} format";`,
			);
		}
	}

	if (schema.pattern !== undefined) {
		checks.push(
			`if (!new RegExp("${schema.pattern}").test(${key})) ` +
				`return "String must match pattern: ${schema.pattern}";`,
		);
	}

	// Fast throwing version
	const throwingBody = `
			if (typeof ${key} !== "string") throw new Error("Value must be a string");
			${checks.reduce((acc, check) => acc + ' else ' + check, '')}
	`;

	// Fast single-error version
	const quickBody = `
			if (typeof ${key} !== "string") return "Value must be a string";
			${checks.reduce((acc, check) => acc + ' else ' + check, '')}
	`;

	// Collecting version
	const collectingBody = `
			if (typeof ${key} !== "string") allErrors.push("Value must be a string");
			${checks.reduce(
				(acc, check) =>
					acc +
					' else ' +
					check.replace('return', 'allErrors.push(').replace(/;$/, ');'),
				'',
			)}
	`;

	return {
		validate: collectingBody,
		validateOrThrow: throwingBody,
		isValid: quickBody,
	};
}
