import { createAction } from 'typesafe-actions';
import { MODAL_OPTIONS } from './reducer';

export const setModal = createAction(`SET_MODAL_DATA`, (modalName: MODAL_OPTIONS, value: string) => ({
	key: value,
	activeModal: modalName
}))();
