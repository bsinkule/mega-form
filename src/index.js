import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import configStore, { history } from './configStore'
import App from './app';
import AppRouter from './components/AppRouter';
import GlobalStyles from './globalStyles';

const store = configStore()
window.store = store

  ReactDOM.render(
    <Provider store={store}>
      <GlobalStyles />
        <ConnectedRouter history={history}>
            <App>
              <AppRouter />
            </App>
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('app')
  )
