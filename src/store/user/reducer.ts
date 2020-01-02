import { createReducer } from 'typesafe-actions';
import { setUserLoggedInStatus } from './actions';

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
	GoogleId?: string;
	Name?: string;
	NewLeaf?: ISaveData;
	NewHorizons?: ISaveData;
}

export interface IUserState extends IPlayer {
	isLoggedIn: boolean;
}

export const initialUserState: IUserState = {
	isLoggedIn: false
};

const genericAction = (state, action) => ({
	...state,
	...action.payload
});

export const userReducer = createReducer(initialUserState).handleAction(setUserLoggedInStatus, genericAction);

export type UserState = ReturnType<typeof userReducer>;
