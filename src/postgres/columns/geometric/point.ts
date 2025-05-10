export type PointColumnModel = {
	readonly type: 'point';
	readonly default?: [number, number] | { sql: string };
	readonly examples?: [number, number][];
};
