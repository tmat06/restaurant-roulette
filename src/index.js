import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ducks/store';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <MuiThemeProvider>
                <App />
            </MuiThemeProvider>
        </HashRouter>
    </Provider>
    , document.getElementById('root'));
