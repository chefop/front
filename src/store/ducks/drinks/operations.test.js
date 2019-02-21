import { fork } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

// Import action types
import { ADD_DRINK, FETCH_DRINKS, UPDATE_DRINK, DELETE_DRINK } from '.';

// Import action Creators
import { addDrink, fetchDrinks, updateDrink, deleteDrink } from '.';

// Workers
import {
  addDrinkWorker,
  fetchDrinksWorker,
  updateDrinkWorker,
  deleteDrinkWorker,
} from './operations';

// Watchers
import {
  addDrinkSaga,
  fetchDrinksSaga,
  updateDrinkSaga,
  deleteDrinkSaga,
} from './operations';

import * as drinksAPI from '../../APICalls/drinksAPI';

import drinkSagas from './operations';

// WORKERS
describe('addDrinkWorker', () => {
  it('add a drink', () => {
    const action = {
      payload: {
        name: 'ma nouvelle boisson',
      },
    };

    const fakeRes = {
      status: 200,
      data: {
        drink: { name: 'Ma nouvelle boisson' },
      },
    };

    return expectSaga(addDrinkWorker, action)
      .provide([[matchers.call.fn(drinksAPI.createDrink), fakeRes]])
      .put(addDrink.success({ name: 'Ma nouvelle boisson' }))

      .run();
  });

  it('and handles errors', () => {
    const action = {
      payload: {
        name: 'Ma nouvelle boisson',
      },
    };
    const error = new Error('error');

    return expectSaga(addDrinkWorker, action)
      .provide([[matchers.call.fn(drinksAPI.createDrink), throwError(error)]])
      .put(addDrink.failure('error'))

      .run();
  });
});

describe('fetchDrinksWorker', () => {
  it('fetch Drinks', () => {
    const fakeRes = {
      status: 200,
      data: {
        drink: { name: 'mes boissons' },
      },
    };

    return expectSaga(fetchDrinksWorker)
      .provide([[matchers.call.fn(drinksAPI.fetchDrinks), fakeRes]])
      .put(fetchDrinks.success({ name: 'mes boissons' }))

      .run();
  });

  it('and handles errors', () => {
    const error = new Error('error');

    return expectSaga(fetchDrinksWorker)
      .provide([[matchers.call.fn(drinksAPI.fetchDrinks), throwError(error)]])
      .put(fetchDrinks.failure('error'))

      .run();
  });
});

describe('updateDrinkWorker', () => {
  it('update drink', () => {
    const action = {
      payload: {
        _id: '12987',
        name: 'New name',
      },
    };

    const fakeRes = {
      status: 200,
      data: {
        drink: action.payload,
      },
    };

    return expectSaga(updateDrinkWorker, action)
      .provide([[matchers.call.fn(drinksAPI.updateDrink), fakeRes]])
      .put(updateDrink.success({ _id: '12987', name: 'New name' }))

      .run();
  });

  it('and handles errors', () => {
    const action = {
      payload: {
        _id: '12987',
        name: 'New name',
      },
    };
    const error = new Error('error');

    return expectSaga(updateDrinkWorker, action)
      .provide([[matchers.call.fn(drinksAPI.updateDrink), throwError(error)]])
      .put(updateDrink.failure('error'))

      .run();
  });
});

describe('deleteDrinkWorker', () => {
  it('delete drink', () => {
    const action = {
      payload: 'drinkID',
    };

    const fakeRes = {
      status: 200,
      data: {
        drink: { name: 'boisson supprimée', _id: action.payload },
      },
    };

    return expectSaga(deleteDrinkWorker, action)
      .provide([[matchers.call.fn(drinksAPI.deleteDrink), fakeRes]])
      .put(deleteDrink.success('drinkID'))

      .run();
  });

  it('and handles errors', () => {
    const action = {
      payload: 'drinkID',
    };
    const error = new Error('error');

    return expectSaga(deleteDrinkWorker, action)
      .provide([[matchers.call.fn(drinksAPI.deleteDrink), throwError(error)]])
      .put(deleteDrink.failure('error'))

      .run();
  });
});

it('should calls the addDrinkWorker', () => {
  testSaga(addDrinkSaga)
    .next()
    .takeLatest(ADD_DRINK.request, addDrinkWorker)

    .finish()
    .isDone();
});

it('should calls the fetchDrinksWorker', () => {
  testSaga(fetchDrinksSaga)
    .next()
    .takeLatest(FETCH_DRINKS.request, fetchDrinksWorker)

    .finish()
    .isDone();
});

it('should calls the updateDrinkWorker', () => {
  testSaga(updateDrinkSaga)
    .next()
    .takeLatest(UPDATE_DRINK.request, updateDrinkWorker)

    .finish()
    .isDone();
});

it('should calls the deleteDrinkWorker', () => {
  testSaga(deleteDrinkSaga)
    .next()
    .takeLatest(DELETE_DRINK.request, deleteDrinkWorker)

    .finish()
    .isDone();
});

it('should calls the drink sagas', () => {
  testSaga(drinkSagas)
    .next()
    .all([
      fork(addDrinkSaga),
      fork(fetchDrinksSaga),
      fork(updateDrinkSaga),
      fork(deleteDrinkSaga),
    ])

    .finish()
    .isDone();
});
