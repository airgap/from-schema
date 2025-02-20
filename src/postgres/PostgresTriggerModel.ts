export type PostgresTriggerModel = {
	readonly name?: string;
	readonly type: 'before' | 'after';
	readonly event: 'insert' | 'update' | 'delete';
};
