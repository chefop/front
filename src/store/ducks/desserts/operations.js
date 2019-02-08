import { call, fork, put, takeLatest, all } from 'redux-saga/effects';

// Import action type
import { ADD_DESSERT, FETCH_DESSERTS, UPDATE_DESSERT, DELETE_DESSERT } from '.';

// Import action creators
import { addDessert, fetchDesserts, updateDessert, deleteDessert } from '.';

import * as dessertAPI from '../../APICalls/dessertsAPI';

// WORKERS
function* addDessertWorker(action) {
  try {
    const dessert = action.payload;
    const res = yield call(dessertAPI.createDessert, dessert);
    if (res.status === 200) {
      const dessert = res.data.starter;
      yield put(addDessert.success(dessert()));
    }
  } catch (err) {
    yield put(addDessert.failure(err.message));
  }
}

function* fetchDessertsWorker() {
  try {
    const res = yield call(dessertAPI.fetchDesserts);
    if (res.status === 200) {
      const dessert = res.data.starter;
      yield put(fetchDesserts.success(dessert()));
    }
  } catch (err) {
    yield put(fetchDesserts.failure(err.message));
  }
}

function* updateDessertWorker(action) {
  try {
    const dessert = action.payload;
    const res = yield call(dessertAPI.updateDessert, dessert);
    if (res.status === 200) {
      const dessert = res.data.starter;
      yield put(updateDessert.success(dessert()));
    }
  } catch (err) {
    yield put(updateDessert.failure(err.message));
  }
}

function* deleteDessertWorker(action) {
  try {
    const dessert = action.payload;
    const res = yield call(dessertAPI.deleteDessert, dessert);
    if (res.status === 200) {
      const dessert = res.data.starter;
      yield put(deleteDessert.success(dessert()));
    }
  } catch (err) {
    yield put(deleteDessert.failure(err.message));
  }
}

// WATCHERS
function* addDessertSaga() {
  yield takeLatest(ADD_DESSERT.request, addDessertWorker);
}

function* fetchDessertsSaga() {
  yield takeLatest(FETCH_DESSERTS.request, fetchDessertsWorker);
}

function* updateDessertSaga() {
  yield takeLatest(UPDATE_DESSERT.request, updateDessertWorker);
}

function* deleteDessertSaga() {
  yield takeLatest(DELETE_DESSERT.request, deleteDessertWorker);
}

// Export watchers
export default function* dessertSagas() {
  yield all([
    fork(addDessertSaga),
    fork(fetchDessertsSaga),
    fork(updateDessertSaga),
    fork(deleteDessertSaga),
  ]);
}
