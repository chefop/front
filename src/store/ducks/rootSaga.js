import { all, fork } from 'redux-saga/effects';

// Import all sagas
import starterSaga from './starters/operations';
import mainSaga from './main/operations';

export default function* rootSaga() {
  yield all([fork(starterSaga)], [fork(mainSaga)]);
}
