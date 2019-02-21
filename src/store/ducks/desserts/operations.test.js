import { fork } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

// Action types
import { ADD_DESSERT, FETCH_DESSERTS, UPDATE_DESSERT, DELETE_DESSERT } from '.';

// Action Creators
import { addDessert, fetchDesserts, updateDessert, deleteDessert } from '.';

// Workers
import {
  addDessertWorker,
  fetchDessertsWorker,
  updateDessertWorker,
  deleteDessertWorker,
} from './operations';

// Watchers
import {
  addDessertSaga,
  fetchDessertsSaga,
  updateDessertSaga,
  deleteDessertSaga,
} from './operations';

import * as dessertAPI from '../../APICalls/dessertAPI';

import dessertSagas from './operations';

// WORKERS
describe('addDessertWorker', () => {
  it('add a dessert', () => {
    const action = {
      payload: {
        name: 'mon nouveau dessert',
      },
    };

    const fakeRes = {
      status: 200,
      data: {
        dessert: { name: 'mon nouveau dessert' },
      },
    };

    return expectSaga(addDessertWorker, action)
      .provide([[matchers.call.fn(dessertAPI.createDessert), fakeRes]])
      .put(addDessert.success({ name: 'mon nouveau dessert' }))

      .run();
  });

  it('and handles errors', () => {
    const action = {
      payload: {
        name: 'mon nouveau dessert',
      },
    };
    const error = new Error('error');

    return expectSaga(addDessertWorker, action)
      .provide([
        [matchers.call.fn(dessertAPI.createDessert), throwError(error)],
      ])
      .put(addDessert.failure('error'))

      .run();
  });
});

describe('fetchDessertsWorker', () => {
  it('fetch desserts', () => {
    const fakeRes = {
      status: 200,
      data: {
        desserts: { name: 'mes desserts' },
      },
    };

    return expectSaga(fetchDessertsWorker)
      .provide([[matchers.call.fn(dessertAPI.fetchDesserts), fakeRes]])
      .put(fetchDesserts.success({ name: 'mes desserts' }))

      .run();
  });

  it('and handles errors', () => {
    const error = new Error('error');

    return expectSaga(fetchDessertsWorker)
      .provide([
        [matchers.call.fn(dessertAPI.fetchDesserts), throwError(error)],
      ])
      .put(fetchDesserts.failure('error'))

      .run();
  });
});

describe('updateDessertWorker', () => {
  it('update dessert', () => {
    const action = {
      payload: {
        _id: '12987',
        name: 'New name',
      },
    };

    const fakeRes = {
      status: 200,
      data: {
        dessert: action.payload,
      },
    };

    return expectSaga(updateDessertWorker, action)
      .provide([[matchers.call.fn(dessertAPI.updateDessert), fakeRes]])
      .put(updateDessert.success({ _id: '12987', name: 'New name' }))

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

    return expectSaga(updateDessertWorker, action)
      .provide([
        [matchers.call.fn(dessertAPI.updateDessert), throwError(error)],
      ])
      .put(updateDessert.failure('error'))

      .run();
  });
});

describe('deleteDessertWorker', () => {
  it('delete dessert', () => {
    const action = {
      payload: 'dessertId',
    };

    const fakeRes = {
      status: 200,
      data: {
        dessert: { name: 'dessert supprimé', _id: action.payload },
      },
    };

    return expectSaga(deleteDessertWorker, action)
      .provide([[matchers.call.fn(dessertAPI.deleteDessert), fakeRes]])
      .put(deleteDessert.success('dessertId'))

      .run();
  });

  it('and handles errors', () => {
    const action = {
      payload: 'dessertId',
    };
    const error = new Error('error');

    return expectSaga(deleteDessertWorker, action)
      .provide([
        [matchers.call.fn(dessertAPI.deleteDessert), throwError(error)],
      ])
      .put(deleteDessert.failure('error'))

      .run();
  });
});

// Watchers
it('should calls the addDessertWorker', () => {
  testSaga(addDessertSaga)
    .next()
    .takeLatest(ADD_DESSERT.request, addDessertWorker)

    .finish()
    .isDone();
});

it('should calls the fetchDessertsWorker', () => {
  testSaga(fetchDessertsSaga)
    .next()
    .takeLatest(FETCH_DESSERTS.request, fetchDessertsWorker)

    .finish()
    .isDone();
});

it('should calls the updateDessertWorker', () => {
  testSaga(updateDessertSaga)
    .next()
    .takeLatest(UPDATE_DESSERT.request, updateDessertWorker)

    .finish()
    .isDone();
});

it('should calls the deleteDessertWorker', () => {
  testSaga(deleteDessertSaga)
    .next()
    .takeLatest(DELETE_DESSERT.request, deleteDessertWorker)

    .finish()
    .isDone();
});

it('should calls the dessert sagas', () => {
  testSaga(dessertSagas)
    .next()
    .all([
      fork(addDessertSaga),
      fork(fetchDessertsSaga),
      fork(updateDessertSaga),
      fork(deleteDessertSaga),
    ])

    .finish()
    .isDone();
});
