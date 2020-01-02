import { createReducer } from 'typesafe-actions';
import { setUserLoggedInStatus } from './actions';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';

export interface IUserState extends IPlayer {
	isLoggedIn: boolean;
}

export const initialUserState: IUserState = {
	GoogleId: '',
	Name: '',
	NewHorizons: null,
	NewLeaf: null,
	isLoggedIn: false
};

const genericAction = (state, action) => ({
	...state,
	...action.payload
});

export const userReducer = createReducer(initialUserState).handleAction(setUserLoggedInStatus, genericAction);

export type UserState = ReturnType<typeof userReducer>;
