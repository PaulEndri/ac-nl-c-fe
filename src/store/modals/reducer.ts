import { createReducer } from 'typesafe-actions';
import { setModal } from './actions';

export enum MODAL_OPTIONS {
	Villager = 'Villager',
	Fish = 'Fish',
	Bug = 'Bug',
	DeepSea = 'DeepSea',
	User = 'User'
}

export interface IModalState {
	readonly activeModal: MODAL_OPTIONS;
	readonly key: string;
}

export const initialGlobalState: IModalState = {
	key: null,
	activeModal: null
};

const genericAction = (state, action) => ({
	...state,
	...action.payload
});

export const modalReducer = createReducer(initialGlobalState).handleAction(setModal, genericAction);

export type ModalState = ReturnType<typeof modalReducer>;
