import { createReducer } from 'typesafe-actions';
import { setGlobalTimeAction, setGlobalMenuAction } from './actions';
import { IS_DESKTOP } from '../../components/helpers/isDesktop';

export interface IGlobalState {
	readonly activeVillagerIndex: number;
	readonly date: string;
	readonly menuState: boolean;
	readonly user: any;
}

export const initialGlobalState: IGlobalState = {
	activeVillagerIndex: undefined,
	date: new Date().toString(),
	menuState: IS_DESKTOP,
	user: null
};

const genericAction = (state, action) => ({
	...state,
	...action.payload
});

export const globalReducer = createReducer(initialGlobalState)
	.handleAction(setGlobalTimeAction, genericAction)
	.handleAction(setGlobalMenuAction, genericAction);

export type GlobalState = ReturnType<typeof globalReducer>;
