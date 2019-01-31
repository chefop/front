import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';

import reducer from './ducks';

const middlewares = [];

export default function createInitialStore() {
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  return store;
}
