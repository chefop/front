import { call, fork, put, takeLatest, all, select } from 'redux-saga/effects';

// Import action types
import { ADD_STARTER } from '.';

// Import action Creators
import { addStarter } from '.';

import * as starterAPI from '../../APICalls/starterAPI';

// WORKERS
function* addStarterWorker(action) {
  try {
    const starter = action.payload;
    const res = yield call(starterAPI.createStarter, starter);
    if (res.status === 200) {
      const starter = res.data.starter;
      yield put(addStarter.success(starter));
    }
  } catch (err) {
    yield put(addStarter.failure(err.message));
  }
}

// WATCHERS
function* addStarterSaga() {
  yield takeLatest(ADD_STARTER.request, addStarterWorker);
}

// Export watchers
export default function* starterSagas() {
  yield all([fork(addStarterSaga)]);
}
