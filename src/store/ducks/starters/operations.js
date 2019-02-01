import { call, fork, put, takeLatest, all } from 'redux-saga/effects';

// Import action types
import {
  ADD_STARTER,
  FETCH_STARTERS,
  UPDATE_STARTER,
  DELETE_STARTER,
  FETCH_STARTER,
} from '.';

// Import action Creators
import {
  addStarter,
  fetchStarters,
  updateStarter,
  deleteStarter,
  fetchStarter,
} from '.';

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
    const res = yield call(starterAPI.fetchStarter);
    if (res.status === 200) {
      const starter = res.data.starter;
      yield put(fetchStarter.success(starter));
    }
  } catch (err) {
    yield put(fetchStarter.failure(err.message));
  }
}

function* fetchStartersWorker() {
  try {
    const res = yield call(starterAPI.fetchStarters);
    if (res.status === 200) {
      const starters = res.data.starters;
      yield put(fetchStarters.success(starters));
    }
  } catch (err) {
    yield put(fetchStarters.failure(err.message));
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
    yield put(updateStarter.failure(err.message));
  }
}

function* deleteStarterWorker(action) {
  try {
    const starterId = action.payload;
    const res = yield call(starterAPI.deleteStarter, starterId);
    if (res.status === 200) {
      const starter = res.data.starter;
      yield put(deleteStarter.success(starter._id));
    }
  } catch (err) {
    yield put(deleteStarter.failure(err.message));
  }
}

// WATCHERS
function* addStarterSaga() {
  yield takeLatest(ADD_STARTER.request, addStarterWorker);
}

function* fetchStarterSaga() {
  yield takeLatest(FETCH_STARTER.request, fetchStarterWorker);
}

function* fetchStartersSaga() {
  yield takeLatest(FETCH_STARTERS.request, fetchStartersWorker);
}

function* updateStarterSaga() {
  yield takeLatest(UPDATE_STARTER.request, updateStarterWorker);
}

function* deleteStarterSaga() {
  yield takeLatest(DELETE_STARTER.request, deleteStarterWorker);
}

// Export watchers
export default function* starterSagas() {
  yield all(
    [fork(addStarterSaga)],
    [fork(fetchStarterSaga)],
    [fork(fetchStartersSaga)],
    [fork(updateStarterSaga)],
    [fork(deleteStarterSaga)],
  );
}
