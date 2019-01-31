import { call, fork, put, takeLatest, all, select } from 'redux-saga/effects';

// Import action types
import { ADD_STARTER, FETCH_STARTER, UPDATE_STARTER } from '.';

// Import action Creators
import { addStarter, fetchStarter, updateStarter } from '.';

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

function* fetchStarterWorker() {
  try {
    const res = yield call(starterAPI.fetchStarters);
    if (res.status === 200) {
      const starters = res.data.starters;
      yield put(fetchStarter.success(starters));
    }
  } catch (err) {
    yield put(fetchStarter.failure(err.message));
  }
}

function* updateStarterWorker(action) {
  try {
    const starter = action.payload;
    const res = yield call(starterAPI.updateStarter, starter);
    if (res.status === 200) {
      const starter = res.data.starters;
      yield put(updateStarter.success(starter));
    }
  } catch (err) {
    yield put(fetchStarter.failure(err.message));
  }
}

// WATCHERS
function* addStarterSaga() {
  yield takeLatest(ADD_STARTER.request, addStarterWorker);
}

function* fetchStarterSaga() {
  yield takeLatest(FETCH_STARTER.request, fetchStarterWorker);
}

function* updateStarterSaga() {
  yield takeLatest(UPDATE_STARTER.request, updateStarterWorker);
}

// Export watchers
export default function* starterSagas() {
  yield all(
    [fork(addStarterSaga)],
    [fork(fetchStarterSaga)],
    [fork(updateStarterSaga)],
  );
}
