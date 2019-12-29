import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.tsx';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './store';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.scss';
import 'primeflex/primeflex.css';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
