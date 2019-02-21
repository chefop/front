import { call, fork, put, takeLatest, all } from 'redux-saga/effects';

// Import action type
import { ADD_DESSERT, FETCH_DESSERTS, UPDATE_DESSERT, DELETE_DESSERT } from '.';

// Import action creators
import { addDessert, fetchDesserts, updateDessert, deleteDessert } from '.';

import * as dessertAPI from '../../APICalls/dessertAPI';

// WORKERS
export function* addDessertWorker(action) {
  try {
    const dessert = action.payload;
    const res = yield call(dessertAPI.createDessert, dessert);
    if (res.status === 200) {
      const dessert = res.data.dessert;
      yield put(addDessert.success(dessert));
    }
  } catch (err) {
    yield put(addDessert.failure(err.message));
  }
}

export function* fetchDessertsWorker() {
  try {
    const res = yield call(dessertAPI.fetchDesserts);
    if (res.status === 200) {
      const desserts = res.data.desserts;
      yield put(fetchDesserts.success(desserts));
    }
  } catch (err) {
    yield put(fetchDesserts.failure(err.message));
  }
}

export function* updateDessertWorker(action) {
  try {
    const dessert = action.payload;
    const res = yield call(dessertAPI.updateDessert, dessert);
    if (res.status === 200) {
      const dessert = res.data.dessert;
      yield put(updateDessert.success(dessert));
    }
  } catch (err) {
    yield put(updateDessert.failure(err.message));
  }
}

export function* deleteDessertWorker(action) {
  try {
    const dessert = action.payload;
    const res = yield call(dessertAPI.deleteDessert, dessert);
    if (res.status === 200) {
      const dessert = res.data.dessert;
      yield put(deleteDessert.success(dessert._id));
    }
  } catch (err) {
    yield put(deleteDessert.failure(err.message));
  }
}

// WATCHERS
export function* addDessertSaga() {
  yield takeLatest(ADD_DESSERT.request, addDessertWorker);
}

export function* fetchDessertsSaga() {
  yield takeLatest(FETCH_DESSERTS.request, fetchDessertsWorker);
}

export function* updateDessertSaga() {
  yield takeLatest(UPDATE_DESSERT.request, updateDessertWorker);
}

export function* deleteDessertSaga() {
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
