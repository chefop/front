import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import reducer from './ducks';
import rootSaga from './ducks/rootSaga';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const middlewares = [routerMiddleware(history), sagaMiddleware];

export default function createInitialStore() {
  const store = createStore(
    reducer(history),
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
