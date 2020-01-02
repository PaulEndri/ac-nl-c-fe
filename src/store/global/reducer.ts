import { createReducer } from 'typesafe-actions';
import { setGlobalTimeAction, setGlobalMenuAction, setGlobalSavePending } from './actions';
import { IS_DESKTOP } from '../../components/helpers/isDesktop';

export interface IGlobalState {
	readonly activeVillagerIndex: number;
	readonly date: Date;
	readonly menuState: boolean;
	readonly saving: boolean;
}

export const initialGlobalState: IGlobalState = {
	activeVillagerIndex: undefined,
	date: new Date(),
	menuState: IS_DESKTOP,
	saving: false
};

const genericAction = (state, action) => ({
	...state,
	...action.payload
});

export const globalReducer = createReducer(initialGlobalState)
	.handleAction(setGlobalTimeAction, genericAction)
	.handleAction(setGlobalMenuAction, genericAction)
	.handleAction(setGlobalSavePending, genericAction);

export type GlobalState = ReturnType<typeof globalReducer>;
