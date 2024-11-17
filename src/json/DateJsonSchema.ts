export type DateJsonSchema = {
	readonly type: 'string';
	readonly format: 'date-time';
	readonly minimum?: string;
	readonly maximum?: string;
};
