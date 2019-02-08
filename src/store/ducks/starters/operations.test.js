import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

// Action types
import { ADD_STARTER, FETCH_STARTERS, UPDATE_STARTER, DELETE_STARTER } from '.';

// Action Creators
import { addStarter, fetchStarters, updateStarter, deleteStarter } from '.';

// Workers
import {
  addStarterWorker,
  fetchStartersWorker,
  updateStarterWorker,
  deleteStarterWorker,
} from './operations';

// Watchers
import {
  addStarterSaga,
  fetchStartersSaga,
  updateStarterSaga,
  deleteStarterSaga,
} from './operations';

import * as starterAPI from '../../APICalls/starterAPI';

// WORKERS
it('add a starter', () => {
  const action = {
    payload: {
      name: 'Ma nouvelle entrée',
    },
  };

  const fakeRes = {
    status: 200,
    data: {
      starter: { name: 'Ma nouvelle entrée' },
    },
  };

  return expectSaga(addStarterWorker, action)
    .provide([[matchers.call.fn(starterAPI.createStarter), fakeRes]])
    .put(addStarter.success({ name: 'Ma nouvelle entrée' }))

    .run();
});

it('and handles errors', () => {
  const action = {
    payload: {
      name: 'Ma nouvelle entrée',
    },
  };
  const error = new Error('error');

  return expectSaga(addStarterWorker, action)
    .provide([[matchers.call.fn(starterAPI.createStarter), throwError(error)]])
    .put(addStarter.failure('error'))

    .run();
});

it('fetch starters', () => {
  const fakeRes = {
    status: 200,
    data: {
      starters: { name: 'mes entrées' },
    },
  };

  return expectSaga(fetchStartersWorker)
    .provide([[matchers.call.fn(starterAPI.fetchStarters), fakeRes]])
    .put(fetchStarters.success({ name: 'mes entrées' }))

    .run();
});

it('and handles errors', () => {
  const error = new Error('error');

  return expectSaga(fetchStartersWorker)
    .provide([[matchers.call.fn(starterAPI.fetchStarters), throwError(error)]])
    .put(fetchStarters.failure('error'))

    .run();
});

it('update starter', () => {
  const action = {
    payload: {
      _id: '12987',
      name: 'New name',
    },
  };

  const fakeRes = {
    status: 200,
    data: {
      starter: action.payload,
    },
  };

  return expectSaga(updateStarterWorker, action)
    .provide([[matchers.call.fn(starterAPI.updateStarter), fakeRes]])
    .put(updateStarter.success({ _id: '12987', name: 'New name' }))

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

  return expectSaga(updateStarterWorker, action)
    .provide([[matchers.call.fn(starterAPI.updateStarter), throwError(error)]])
    .put(updateStarter.failure('error'))

    .run();
});

it('delete starter', () => {
  const action = {
    payload: 'starterId',
  };

  const fakeRes = {
    status: 200,
    data: {
      starter: { name: 'starter supprimé', _id: action.payload },
    },
  };

  return expectSaga(deleteStarterWorker, action)
    .provide([[matchers.call.fn(starterAPI.deleteStarter), fakeRes]])
    .put(deleteStarter.success('starterId'))

    .run();
});

it('and handles errors', () => {
  const action = {
    payload: 'starterId',
  };
  const error = new Error('error');

  return expectSaga(deleteStarterWorker, action)
    .provide([[matchers.call.fn(starterAPI.deleteStarter), throwError(error)]])
    .put(deleteStarter.failure('error'))

    .run();
});

// Watchers
it('should calls the addStarterWorker', () => {
  testSaga(addStarterSaga)
    .next()
    .takeLatest(ADD_STARTER.request, addStarterWorker)

    .finish()
    .isDone();
});

it('should calls the fetchStartersWorker', () => {
  testSaga(fetchStartersSaga)
    .next()
    .takeLatest(FETCH_STARTERS.request, fetchStartersWorker)

    .finish()
    .isDone();
});

it('should calls the updateStarterWorker', () => {
  testSaga(updateStarterSaga)
    .next()
    .takeLatest(UPDATE_STARTER.request, updateStarterWorker)

    .finish()
    .isDone();
});

it('should calls the deleteStarterWorker', () => {
  testSaga(deleteStarterSaga)
    .next()
    .takeLatest(DELETE_STARTER.request, deleteStarterWorker)

    .finish()
    .isDone();
});
