import { call, fork, put, takeLatest, all } from 'redux-saga/effects';

// Import action types
import { ADD_MAIN, FETCH_MAINS, UPDATE_MAIN, DELETE_MAIN, FETCH_MAIN } from '.';

// Import action Creators
import { addMain, fetchMains, updateMain, deleteMain, fetchMain } from '.';

import * as mainAPI from '../../APICalls/mainAPI';

// WORKERS
function* addMainWorker(action) {
  try {
    const main = action.payload;
    const res = yield call(mainAPI.createMain, main);
    if (res.status === 200) {
      const main = res.data.main;
      yield put(addMain.success(main));
    }
  } catch (err) {
    yield put(addMain.failure(err.message));
  }
}

function* fetchMainsWorker() {
  try {
    const res = yield call(mainAPI.fetchMains);
    if (res.status === 200) {
      const mains = res.data.mains;
      yield put(fetchMains.success(mains));
    }
  } catch (err) {
    yield put(fetchMains.failure(err.message));
  }
}

function* fetchMainWorker() {
  try {
    const res = yield call(mainAPI.fetchMain);
    if (res.status === 200) {
      const main = res.data.main;
      yield put(fetchMain.success(main));
    }
  } catch (err) {
    yield put(fetchMain.failure(err.message));
  }
}

function* updateMainWorker(action) {
  try {
    const main = action.payload;
    const res = yield call(mainAPI.updateMain, main);
    if (res.status === 200) {
      const main = res.data.main;
      yield put(updateMain.success(main));
    }
  } catch (err) {
    yield put(updateMain.failure(err.message));
  }
}

function* deleteMainWorker(action) {
  try {
    const mainId = action.payload;
    const res = yield call(mainAPI.deleteMain, mainId);
    if (res.status === 200) {
      const main = res.data.main;
      yield put(deleteMain.success(main._id));
    }
  } catch (err) {
    yield put(deleteMain.failure(err.message));
  }
}

// WATCHERS
function* addMainSaga() {
  yield takeLatest(ADD_MAIN.request, addMainWorker);
}

function* fetchMainsSaga() {
  yield takeLatest(FETCH_MAINS.request, fetchMainsWorker);
}

function* fetchMainSaga() {
  yield takeLatest(FETCH_MAIN.request, fetchMainWorker);
}

function* updateMainSaga() {
  yield takeLatest(UPDATE_MAIN.request, updateMainWorker);
}

function* deleteMainSaga() {
  yield takeLatest(DELETE_MAIN.request, deleteMainWorker);
}

// Export watchers
export default function* mainSagas() {
  yield all(
    [fork(addMainSaga)],
    [fork(fetchMainsSaga)],
    [fork(fetchMainSaga)],
    [fork(updateMainSaga)],
    [fork(deleteMainSaga)],
  );
}
