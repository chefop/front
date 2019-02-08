import { call, fork, put, takeLatest, all } from 'redux-saga/effects';

// Import action Types
import { ADD_DRINK, DELETE_DRINK, UPDATE_DRINK, FETCH_DRINKS } from '.';

// Import actions Creators
import { addDrink, deleteDrink, updateDrink, fetchDrinks } from '.';

import * as drinkAPI from '../../APICalls/drinksAPI';

// WORKERS
function* addDrinkWorker(action) {
  try {
    const drink = action.payload;
    const res = yield call(drinkAPI.createDrink, drink);
    if (res.status === 200) {
      const drink = res.data.drink;
      yield put(addDrink.success(drink));
    }
  } catch (err) {
    yield put(addDrink.failure(err.message));
  }
}

function* updateDrinkWorker(action) {
  try {
    const drink = action.payload;
    const res = yield call(drinkAPI.updateDrink, drink);
    if (res.status === 200) {
      const drink = res.data.drink;
      yield put(updateDrink.success(drink));
    }
  } catch (err) {
    yield put(updateDrink.failure(err.message));
  }
}

function* fetchDrinksWorker() {
  try {
    const res = yield call(drinkAPI.fetchDrinks);
    if (res.status === 200) {
      const drinks = res.data.drinks;
      yield put(fetchDrinks.success(drinks));
    }
  } catch (err) {
    yield put(fetchDrinks.failure(err.message));
  }
}

function* deleteDrinkWorker(action) {
  try {
    const drinkId = action.payload;
    const res = yield call(drinkAPI.deleteDrink, drinkId);
    if (res.status === 200) {
      const drink = res.data.drink;
      yield put(deleteDrink.success(drink._id));
    }
  } catch (err) {
    yield put(deleteDrink.failure(err.message));
  }
}

// WATCHERS
function* addDrinkSaga() {
  yield takeLatest(ADD_DRINK.request, addDrinkWorker);
}

function* updateDrinkSaga() {
  yield takeLatest(UPDATE_DRINK.request, updateDrinkWorker);
}

function* fetchDrinksSaga() {
  yield takeLatest(FETCH_DRINKS.request, fetchDrinksWorker);
}

function* deleteDrinkSaga() {
  yield takeLatest(DELETE_DRINK.request, deleteDrinkWorker);
}

// Export watchers
export default function* drinkSagas() {
  yield all([
    fork(addDrinkSaga),
    fork(updateDrinkSaga),
    fork(fetchDrinksSaga),
    fork(deleteDrinkSaga),
  ]);
}
