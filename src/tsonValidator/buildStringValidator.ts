import { StringTsonSchema } from '../tson/StringTsonSchema';
import { ProtoValidator } from '../ProtoValidator';

// Add format regex patterns
const FORMAT_PATTERNS = {
	date: /^\d{4}-\d{2}-\d{2}$/,
	time: /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.\d+)?(Z|[+-]\d{2}:[0-5][0-9])?$/,
	'date-time':
		/^\d{4}-\d{2}-\d{2}T([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.\d+)?(Z|[+-]\d{2}:[0-5][0-9])?$/,
	email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
	hostname:
		/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
	ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
	ipv6: /^(?:(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,7}:|(?:[a-fA-F0-9]{1,4}:){1,6}:[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,5}(?::[a-fA-F0-9]{1,4}){1,2}|(?:[a-fA-F0-9]{1,4}:){1,4}(?::[a-fA-F0-9]{1,4}){1,3}|(?:[a-fA-F0-9]{1,4}:){1,3}(?::[a-fA-F0-9]{1,4}){1,4}|(?:[a-fA-F0-9]{1,4}:){1,2}(?::[a-fA-F0-9]{1,4}){1,5}|[a-fA-F0-9]{1,4}:(?:(?::[a-fA-F0-9]{1,4}){1,6})|:(?:(?::[a-fA-F0-9]{1,4}){1,7}|:))$/,
	uri: /^[a-zA-Z][a-zA-Z0-9+.-]*:[^\s]*$/,
	'uri-reference':
		/^(?:[a-zA-Z][a-zA-Z0-9+.-]*:)?(?:\/\/(?:(?:[a-zA-Z0-9\-._~!$&'()*+,;=:]|%[0-9A-F]{2})*@)?(?:\[(?:(?:(?:(?:[0-9A-F]{1,4}:){6}|::(?:[0-9A-F]{1,4}:){5}|(?:[0-9A-F]{1,4})?::(?:[0-9A-F]{1,4}:){4}|(?:(?:[0-9A-F]{1,4}:){0,1}[0-9A-F]{1,4})?::(?:[0-9A-F]{1,4}:){3}|(?:(?:[0-9A-F]{1,4}:){0,2}[0-9A-F]{1,4})?::(?:[0-9A-F]{1,4}:){2}|(?:(?:[0-9A-F]{1,4}:){0,3}[0-9A-F]{1,4})?::[0-9A-F]{1,4}:|(?:(?:[0-9A-F]{1,4}:){0,4}[0-9A-F]{1,4})?::)(?:[0-9A-F]{1,4}:[0-9A-F]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-F]{1,4}:){0,5}[0-9A-F]{1,4})?::[0-9A-F]{1,4}|(?:(?:[0-9A-F]{1,4}:){0,6}[0-9A-F]{1,4})?::)|[Vv][0-9A-F]+\.[a-zA-Z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[a-zA-Z0-9\-._~!$&'()*+,;=]|%[0-9A-F]{2})*)(?::[0-9]*)?(?:\/(?:[a-zA-Z0-9\-._~!$&'()*+,;=:@]|%[0-9A-F]{2})*)*|\/(?:(?:[a-zA-Z0-9\-._~!$&'()*+,;=:@]|%[0-9A-F]{2})+(?:\/(?:[a-zA-Z0-9\-._~!$&'()*+,;=:@]|%[0-9A-F]{2})*)*)?|(?:[a-zA-Z0-9\-._~!$&'()*+,;=:@]|%[0-9A-F]{2})+(?:\/(?:[a-zA-Z0-9\-._~!$&'()*+,;=:@]|%[0-9A-F]{2})*)*)?(?:\?(?:[a-zA-Z0-9\-._~!$&'()*+,;=:@/?]|%[0-9A-F]{2})*)?(?:#(?:[a-zA-Z0-9\-._~!$&'()*+,;=:@/?]|%[0-9A-F]{2})*)?$/i,
	uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
	'uri-template':
		/^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
	'json-pointer': /^(?:\/(?:[^~/]|~0|~1)*)*$/,
	'relative-json-pointer': /^\d+(?:\/(?:[^~/]|~0|~1)*)*$/,
	regex:
		/^(?:(?:[^?*+{}()[\]\\|/]|\\.|\[(?:[^\]\\]|\\.)*\]|\((?:[^)\\]|\\.)*\)|\{(?:[^}\\]|\\.)*\})+|[?*+{}()[\]\\|/])$/,
} as const;

export function buildStringValidator(schema: StringTsonSchema): {
	validate: string;
	validateOrThrow: string;
	isValid: string;
} {
	// If const is set, only validate against that value
	if ('const' in schema) {
		const constValue = schema.const;

		// Fast throwing version
		const throwingBody = `
			function(value: unknown): void {
				if (typeof value !== "string") throw new Error("Value must be a string");
				if (value !== "${constValue}") throw new Error('Expected "${constValue}", got "' + value + '"');
			}
		`;

		// Fast single-error version
		const quickBody = `
			function(value: unknown): true | string {
				if (typeof value !== "string") return "Value must be a string";
				if (value !== "${constValue}") return 'Expected "${constValue}", got "' + value + '"';
				return true;
			}
		`;

		// Collecting version
		const collectingBody = `
			function(value: unknown): string[] {
				const errors = [];
				if (typeof value !== "string") {
					errors.push("Value must be a string");
					return errors;
				}
				if (value !== "${constValue}") errors.push('Expected "${constValue}", got "' + value + '"');
				return errors;
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
			`if (value.length < ${schema.minLength}) ` +
				`return "String must be at least ${schema.minLength} characters long";`,
		);
	}

	if (schema.maxLength !== undefined) {
		checks.push(
			`if (value.length > ${schema.maxLength}) ` +
				`return "String must be at most ${schema.maxLength} characters long";`,
		);
	}

	if (schema.format !== undefined) {
		const pattern = FORMAT_PATTERNS[schema.format];
		if (pattern) {
			const flags = pattern.toString().match(/\/([gimuy]*)$/)?.[1] || '';
			const patternStr = pattern
				.toString()
				.slice(1, -1 - (flags.length ? flags.length + 1 : 0))
				.replace(/\\/g, '\\\\')
				.replace(/"/g, '\\"')
				.replace(/\$/g, '\\$');
			checks.push(
				`if (!new RegExp("${patternStr}", "${flags}").test(value)) return "String must be a valid ${schema.format} format";`,
			);
		}
	}

	if (schema.pattern !== undefined) {
		checks.push(
			`if (!new RegExp("${schema.pattern}").test(value)) ` +
				`return "String must match pattern: ${schema.pattern}";`,
		);
	}

	// Fast throwing version
	const throwingBody = `
		function(value: unknown): void {
			if (typeof value !== "string") throw new Error("Value must be a string");
			${checks.join('\n			')}
		}
	`;

	// Fast single-error version
	const quickBody = `
		function(value: unknown): true | string {
			if (typeof value !== "string") return "Value must be a string";
			${checks.join('\n			')}
			return true;
		}
	`;

	// Collecting version
	const collectingBody = `
		function(value: unknown): string[] {
			const errors = [];
			if (typeof value !== "string") errors.push("Value must be a string");
			${checks
				.map((check) =>
					check.replace('return', 'errors.push(').replace(/;$/, ');'),
				)
				.join('\n			')}
			return errors;
		}
	`;

	return {
		validate: collectingBody,
		validateOrThrow: throwingBody,
		isValid: quickBody,
	};
}
