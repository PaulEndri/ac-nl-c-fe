import { createReducer } from 'typesafe-actions';
import { SetGlobalTimeAction, SetGlobalMenuAction } from './actions';
import { IS_DESKTOP } from '../../components/helpers/isDesktop';

export interface IGlobalState {
	readonly date: string;
	readonly menuState: boolean;
	readonly user: any;
}

export const initialGlobalState: IGlobalState = {
	date: new Date().toString(),
	menuState: IS_DESKTOP,
	user: null
};

export const globalReducer = createReducer(initialGlobalState)
	.handleAction(SetGlobalTimeAction, (state, action) => ({
		...state,
		...action.payload
	}))
	.handleAction(SetGlobalMenuAction, (state, action) => ({
		...state,
		...action.payload
	}));

export type GlobalState = ReturnType<typeof globalReducer>;
