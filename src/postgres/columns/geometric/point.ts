export type PointColumnModel = {
	readonly type: 'point';
    readonly default?: [number, number] | string;
    readonly examples?: [number,number][];
};
