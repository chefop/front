import { call, fork, put, takeLatest, all } from 'redux-saga/effects';

// Import action Types
import { DELETE_DRINK } from '.';

// Import actions Creators
import { deleteDrink } from '.';

import * as drinkAPI from '../../APICalls/drinksAPI';

// WORKERS
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
function* deleteDrinkSaga() {
  yield takeLatest(DELETE_DRINK.request, deleteDrinkWorker);
}

// Export watchers
export default function* drinkSagas() {
  yield all([fork(deleteDrinkSaga)]);
}
