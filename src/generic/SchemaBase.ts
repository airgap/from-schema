export type SchemaBase = {
	readonly description?: string;
	readonly title?: string;
	readonly unique?: boolean;
	readonly generated?: {
		readonly always?: boolean;
		readonly as: string;
		readonly from: string;
		readonly stored?: boolean;
	};
};
