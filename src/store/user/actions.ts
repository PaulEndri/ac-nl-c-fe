import { createAction } from 'typesafe-actions';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';

export const setUserLoggedInStatus = createAction('SET_USER_LOGGED_IN_STATUS', (status: boolean) => ({
	status
}))();

export const setUserData = createAction('SET_USER_DATA', (data: Partial<IPlayer>) => ({ ...data }))();
