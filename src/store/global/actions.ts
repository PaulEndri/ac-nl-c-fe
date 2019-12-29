import { createAction } from 'typesafe-actions';

export const SetGlobalTimeAction = createAction('SET_GLOBAL_DATE', (date: string) => ({
	date
}))();

export const SetGlobalMenuAction = createAction('SET_GLOBAL_MENU', (menuState: boolean) => ({
	menuState
}))();
