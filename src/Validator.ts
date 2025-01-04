export type Validator = {
	validate: string; //(value: unknown) => string[];
	validateOrThrow: string; //(value: unknown) => void;
	isValid: string; //(value: unknown) => true | string;
};
