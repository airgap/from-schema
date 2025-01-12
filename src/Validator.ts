export type Validator = {
	validate: (value: unknown) => string[];
	validateOrThrow: (value: unknown) => void;
	isValid: (value: unknown) => true | string;
};
