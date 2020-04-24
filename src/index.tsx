import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';
import { configureAxiosJWTInterseptors } from '@axmit/axios-patch-jwt';
import { createBrowserHistory } from 'history';
import { IAsyncStorage, WebStorageDecorator } from 'universal-storage';
import App from 'app/App';
import createStore from 'app/store/createStore';
import 'app/assets/styles/index.scss';

// Axios initialization

const storage: IAsyncStorage = new WebStorageDecorator(localStorage);
configureAxiosJWTInterseptors({
  storage,
  axios,
  refreshTokenEndpoint: '/auth'
});

axios.defaults.baseURL = `/api`;
axios.interceptors.request.use(config => config);
axios.interceptors.response.use(
  response => response,
  error => {
    const { status, statusText, data } = error.response;
    return Promise.reject({ status, statusText, data });
  }
);

// Render Setup

const MOUNT_NODE = document.getElementById('root');
const initialState = (window as any).___INITIAL_STATE__;
const history = createBrowserHistory();
const store = createStore(initialState, history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE
);
