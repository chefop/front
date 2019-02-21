import { call, fork, put, takeLatest, all } from 'redux-saga/effects';

// Import action type
import {
  ADD_ALLERGEN,
  FETCH_ALLERGENS,
  UPDATE_ALLERGEN,
  DELETE_ALLERGEN,
} from '.';

// Import action creators
import { addAllergen, fetchAllergens, updateAllergen, deleteAllergen } from '.';

import * as allergenAPI from '../../APICalls/allergenAPI';

// WORKERS
export function* addAllergenWorker(action) {
  try {
    const allergen = action.payload;
    const res = yield call(allergenAPI.createAllergen, allergen);
    if (res.status === 200) {
      const allergen = res.data.allergen;
      yield put(addAllergen.success(allergen));
    }
  } catch (err) {
    yield put(addAllergen.failure(err.message));
  }
}

export function* fetchAllergensWorker() {
  try {
    const res = yield call(allergenAPI.fetchAllergens);
    if (res.status === 200) {
      const allergens = res.data.allergens;
      yield put(fetchAllergens.success(allergens));
    }
  } catch (err) {
    yield put(fetchAllergens.failure(err.message));
  }
}

export function* updateAllergenWorker(action) {
  try {
    const allergen = action.payload;
    const res = yield call(allergenAPI.updateAllergen, allergen);
    if (res.status === 200) {
      const allergen = res.data.allergen;
      yield put(updateAllergen.success(allergen));
    }
  } catch (err) {
    yield put(updateAllergen.failure(err.message));
  }
}

export function* deleteAllergenWorker(action) {
  try {
    const allergen = action.payload;
    const res = yield call(allergenAPI.deleteAllergen, allergen);
    if (res.status === 200) {
      const allergen = res.data.allergen;
      yield put(deleteAllergen.success(allergen._id));
    }
  } catch (err) {
    yield put(deleteAllergen.failure(err.message));
  }
}

// WATCHERS
export function* addAllergenSaga() {
  yield takeLatest(ADD_ALLERGEN.request, addAllergenWorker);
}

export function* fetchAllergensSaga() {
  yield takeLatest(FETCH_ALLERGENS.request, fetchAllergensWorker);
}

export function* updateAllergenSaga() {
  yield takeLatest(UPDATE_ALLERGEN.request, updateAllergenWorker);
}

export function* deleteAllergenSaga() {
  yield takeLatest(DELETE_ALLERGEN.request, deleteAllergenWorker);
}

// Export watchers
export default function* allergenSagas() {
  yield all([
    fork(addAllergenSaga),
    fork(fetchAllergensSaga),
    fork(updateAllergenSaga),
    fork(deleteAllergenSaga),
  ]);
}
