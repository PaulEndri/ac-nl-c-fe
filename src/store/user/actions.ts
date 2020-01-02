import { createAction } from 'typesafe-actions';

export const setUserLoggedInStatus = createAction('SET_USER_LOGGED_IN_STATUS', (status: boolean) => ({
	status
}))();
