type Event = 'insert' | 'update' | 'delete';
export type PostgresTriggerModel = {
	readonly name?: string;
	readonly sql: string;
} & (
	| {
			before: Event;
	  }
	| { after: Event }
);
