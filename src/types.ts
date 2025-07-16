export type Track = {
	name: string;
	alias: string;
};

export type Entry = {
	track: string;
	carModel: number;
	ballastKg?: number;
	restrictor?: number;
};

export type Data = {
	configVersion: number;
	entries: Entry[];
};
