import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore as createReduxStore, Reducer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import window from 'global/window';
import reducers, { IApplicationState } from 'app/store/reducers';
import rootSaga from 'app/store/sagas';

const sagaMiddleware = createSagaMiddleware();

const createStore = (initialState: IApplicationState, history: History) => {
  // Middleware Configuration
  const middleware = [sagaMiddleware, routerMiddleware(history)];

  // Store Enhancers
  const windowObject = window;
  let composeEnhancers = compose;

  if (process.env.NODE_ENV === 'development' && typeof windowObject.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    composeEnhancers = windowObject.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  try {
    // it's safe to use window now
    (reducers as any).router = connectRouter(history);
    // eslint-disable-next-line no-empty
  } catch (e) {}

  // Store Instantiation
  const storeReducers: Reducer<IApplicationState, never> = combineReducers({
    ...reducers
  } as any);

  const rootReducer: Reducer<IApplicationState, never> = (state, action) => storeReducers(state, action);

  const store = createReduxStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createStore;
