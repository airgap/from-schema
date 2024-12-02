export type NumberBase = {
	minimum?: number;
	maximum?: number;
	exclusiveMinimum?: number;
	exclusiveMaximum?: number;
	multipleOf?: number;
	examples?: number[];
	default?: number | 'nextval';
};
