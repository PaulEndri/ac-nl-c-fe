import { combineReducers, createStore, applyMiddleware } from 'redux';
import { globalReducer } from './global/reducer';
import { modalReducer } from './modals/reducer';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
const generateRootReducer = (history) =>
	combineReducers({
		global: globalReducer,
		modal: modalReducer,
		router: connectRouter(history)
	});

const generateMiddleware = (history) => composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk));

export const history = createBrowserHistory();

export const configureStore = (initialState = {}) =>
	createStore(generateRootReducer(history), initialState, generateMiddleware(history));

export default configureStore;

// export type AppState = ReturnType<typeof rootReducer>;
