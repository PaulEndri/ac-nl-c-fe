import { createAction } from 'typesafe-actions';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';

export const setUserLoggedInStatus = createAction('SET_USER_LOGGED_IN_STATUS', (status: boolean) => ({
	status
}))();

export const setUserData = createAction('SET_USER_DATA', (data: Partial<IPlayer>) => ({ ...data }))();

export const addUserVillager = createAction('ADD_USER_VILLAGER', (name: string) => ({ name }))();
export const removeUserVillager = createAction('REMOVE_USER_VILLAGER', (name: string) => ({ name }))();
export const addUserProjects = createAction('ADD_USER_PROJECTS', (name: string) => ({ name }))();
export const removeUserProjects = createAction('REMOVE_USER_PROJECTS', (name: string) => ({ name }))();

export const addMuseumRecord = createAction('ADD_USER_MUSEUM_RECORD', (key: string, name: string) => ({
	name,
	key
}))();

export const addCatalogRecord = createAction('ADD_USER_CATALOG_RECORD', (key: string, name: string) => ({
	name,
	key
}))();

export const addCatalogFurnitureRecord = createAction(
	'ADD_USER_CATALOG_FURNITURE_RECORD',
	(key: string, name: string) => ({
		name,
		key
	})
)();

export const removeMuseumRecord = createAction('REMOVE_USER_MUSEUM_RECORD', (key: string, name: string) => ({
	name,
	key
}))();

export const removeCatalogRecord = createAction('REMOVE_USER_CATALOG_RECORD', (key: string, name: string) => ({
	name,
	key
}))();

export const removeCatalogFurnitureRecord = createAction(
	'REMOVE_USER_CATALOG_FURNITURE_RECORD',
	(key: string, name: string) => ({
		name,
		key
	})
)();
