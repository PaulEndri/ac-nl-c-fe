import { createAction } from 'typesafe-actions';

export const setGlobalTimeAction = createAction('SET_GLOBAL_DATE', (date: string) => ({
	date
}))();

export const setGlobalMenuAction = createAction('SET_GLOBAL_MENU', (menuState: boolean) => ({
	menuState
}))();
