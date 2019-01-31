import { all, fork } from 'redux-saga/effects';

// Import all sagas
import starterSaga from './starters/operations';

export default function* rootSaga() {
  yield all([fork(starterSaga)]);
}
