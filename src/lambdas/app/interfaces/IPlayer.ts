export interface ISaveData {
	TownName: string;
	Villagers: string[];
	Projects: string[];
	Museum: {
		Fishes: string[];
		Bugs: string[];
		Art: string[];
		Fossils: string[];
		DeepSea: string[];
	};
	Catalogued: {
		Furniture: {
			Furniture: string[];
			Gyroids: string[];
			Wallpapers: string[];
			Flooring: string[];
			Paper: [];
		};
		Clothing: string[];
		Fishes: string[];
		Bugs: string[];
		Art: string[];
		Fossils: string[];
		DeepSea: string[];
		Songs: [];
	};
}
export interface IPlayer {
	GoogleId: string;
	Name: string;
	Email: string;
	NewLeaf: ISaveData;
}
