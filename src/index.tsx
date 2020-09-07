import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider, responsiveFontSizes } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { themeMain } from './themes/theme-main';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RootReducer } from './store/root-reducer';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	// </React.StrictMode>,
	// <React.StrictMode>
	<MuiThemeProvider theme={responsiveFontSizes(themeMain)}>
		<Provider store={configureStore({ reducer: RootReducer })}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('root')
);

serviceWorker.register()