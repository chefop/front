import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './ducks';
import rootSaga from './ducks/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export default function createInitialStore() {
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
