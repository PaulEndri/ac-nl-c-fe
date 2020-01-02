export interface ISaveData {
	TownName: string;
	Villagers: string[];
	Museum: {
		Fishes: string[];
		Bugs: string[];
		Art: string[];
		Fossils: string[];
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
	};
}
export interface IPlayer {
	GoogleId: string;
	Name: string;
	Email: string;
	NewLeaf: ISaveData;
	NewHorizons: ISaveData;
}
