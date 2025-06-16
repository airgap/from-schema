import { ProtoValidator } from '../ProtoValidator';

export type CompiledValidator = {
	validate: (value: unknown) => string[];
	validateOrThrow: (value: unknown) => unknown;
	isValid: (value: unknown) => true | string;
};

export function compileValidator(
	proto: ProtoValidator,
	key: string = 'value',
): CompiledValidator {
	const keyDeclaration = key === 'value' ? '' : `const ${key} = value;`;

	const validateFn = new Function(
		'value',
		`
		let allErrors = [];
		${keyDeclaration}
		${proto.validate}
		return allErrors;
	`,
	) as (value: unknown) => string[];

	const validateOrThrowFn = new Function(
		'value',
		`
		${keyDeclaration}
		${proto.validateOrThrow}
	`,
	) as (value: unknown) => unknown;

	const isValidFn = new Function(
		'value',
		`
		${keyDeclaration}
		${proto.isValid}
		return true;
	`,
	) as (value: unknown) => true | string;

	return {
		validate: validateFn,
		validateOrThrow: validateOrThrowFn,
		isValid: isValidFn,
	};
}
