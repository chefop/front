import { fork } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

// Action types
import {
  ADD_ALLERGEN,
  FETCH_ALLERGENS,
  UPDATE_ALLERGEN,
  DELETE_ALLERGEN,
} from '.';

// Action Creators
import { addAllergen, fetchAllergens, updateAllergen, deleteAllergen } from '.';

// Workers
import {
  addAllergenWorker,
  fetchAllergensWorker,
  updateAllergenWorker,
  deleteAllergenWorker,
} from './operations';

// Watchers
import {
  addAllergenSaga,
  fetchAllergensSaga,
  updateAllergenSaga,
  deleteAllergenSaga,
} from './operations';

import * as allergenAPI from '../../APICalls/allergenAPI';

import allergenSagas from './operations';

// WORKERS
describe('addAllergenWorker', () => {
  it('adds a allergen', () => {
    const action = {
      payload: {
        name: 'mon nouveau allergen',
      },
    };

    const fakeRes = {
      status: 200,
      data: {
        allergen: { name: 'mon nouveau allergen' },
      },
    };

    return expectSaga(addAllergenWorker, action)
      .provide([[matchers.call.fn(allergenAPI.createAllergen), fakeRes]])
      .put(addAllergen.success({ name: 'mon nouveau allergen' }))

      .run();
  });

  it('and handles errors', () => {
    const action = {
      payload: {
        name: 'mon nouveau allergen',
      },
    };
    const error = new Error('error');

    return expectSaga(addAllergenWorker, action)
      .provide([
        [matchers.call.fn(allergenAPI.createAllergen), throwError(error)],
      ])
      .put(addAllergen.failure('error'))

      .run();
  });
});

describe('fetchAllergensWorker', () => {
  it('fetch allergens', () => {
    const fakeRes = {
      status: 200,
      data: {
        allergens: { name: 'mes allergens' },
      },
    };

    return expectSaga(fetchAllergensWorker)
      .provide([[matchers.call.fn(allergenAPI.fetchAllergens), fakeRes]])
      .put(fetchAllergens.success({ name: 'mes allergens' }))

      .run();
  });

  it('and handles errors', () => {
    const error = new Error('error');

    return expectSaga(fetchAllergensWorker)
      .provide([
        [matchers.call.fn(allergenAPI.fetchAllergens), throwError(error)],
      ])
      .put(fetchAllergens.failure('error'))

      .run();
  });
});

describe('updateAllergenWorker', () => {
  it('update allergen', () => {
    const action = {
      payload: {
        _id: '12987',
        name: 'New name',
      },
    };

    const fakeRes = {
      status: 200,
      data: {
        allergen: action.payload,
      },
    };

    return expectSaga(updateAllergenWorker, action)
      .provide([[matchers.call.fn(allergenAPI.updateAllergen), fakeRes]])
      .put(updateAllergen.success({ _id: '12987', name: 'New name' }))

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

    return expectSaga(updateAllergenWorker, action)
      .provide([
        [matchers.call.fn(allergenAPI.updateAllergen), throwError(error)],
      ])
      .put(updateAllergen.failure('error'))

      .run();
  });
});

describe('deleteAllergenWorker', () => {
  it('delete allergen', () => {
    const action = {
      payload: 'allergenId',
    };

    const fakeRes = {
      status: 200,
      data: {
        allergen: { name: 'allergen supprimé', _id: action.payload },
      },
    };

    return expectSaga(deleteAllergenWorker, action)
      .provide([[matchers.call.fn(allergenAPI.deleteAllergen), fakeRes]])
      .put(deleteAllergen.success('allergenId'))

      .run();
  });

  it('and handles errors', () => {
    const action = {
      payload: 'allergenId',
    };
    const error = new Error('error');

    return expectSaga(deleteAllergenWorker, action)
      .provide([
        [matchers.call.fn(allergenAPI.deleteAllergen), throwError(error)],
      ])
      .put(deleteAllergen.failure('error'))

      .run();
  });
});

// Watchers
it('should calls the addAllergenWorker', () => {
  testSaga(addAllergenSaga)
    .next()
    .takeLatest(ADD_ALLERGEN.request, addAllergenWorker)

    .finish()
    .isDone();
});

it('should calls the fetchAllergensWorker', () => {
  testSaga(fetchAllergensSaga)
    .next()
    .takeLatest(FETCH_ALLERGENS.request, fetchAllergensWorker)

    .finish()
    .isDone();
});

it('should calls the updateAllergenWorker', () => {
  testSaga(updateAllergenSaga)
    .next()
    .takeLatest(UPDATE_ALLERGEN.request, updateAllergenWorker)

    .finish()
    .isDone();
});

it('should calls the deleteAllergenWorker', () => {
  testSaga(deleteAllergenSaga)
    .next()
    .takeLatest(DELETE_ALLERGEN.request, deleteAllergenWorker)

    .finish()
    .isDone();
});

it('should calls the allergen sagas', () => {
  testSaga(allergenSagas)
    .next()
    .all([
      fork(addAllergenSaga),
      fork(fetchAllergensSaga),
      fork(updateAllergenSaga),
      fork(deleteAllergenSaga),
    ])

    .finish()
    .isDone();
});
