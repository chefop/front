import { fork } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

// Import action types
import { ADD_TABLE, FETCH_TABLES, UPDATE_TABLE, DELETE_TABLE } from '.';

// Import action Creators
import { addTable, fetchTables, updateTable, deleteTable } from '.';

// Workers
import {
  addTableWorker,
  fetchTablesWorker,
  updateTableWorker,
  deleteTableWorker,
} from './operations';

// Watchers
import {
  addTableSaga,
  fetchTablesSaga,
  updateTableSaga,
  deleteTableSaga,
} from './operations';

import * as tablesAPI from '../../APICalls/tablesAPI';

import tableSagas from './operations';

// WORKERS
describe('addTableWorker', () => {
  it('add a table', () => {
    const action = {
      payload: {
        name: 'Table 1',
      },
    };

    const fakeRes = {
      status: 200,
      data: {
        table: { name: 'Table 1' },
      },
    };

    return expectSaga(addTableWorker, action)
      .provide([[matchers.call.fn(tablesAPI.createTable), fakeRes]])
      .put(addTable.success({ name: 'Table 1' }))

      .run();
  });

  it('and handles errors', () => {
    const action = {
      payload: {
        name: 'Table 1',
      },
    };
    const error = new Error('error');

    return expectSaga(addTableWorker, action)
      .provide([[matchers.call.fn(tablesAPI.createTable), throwError(error)]])
      .put(addTable.failure('error'))

      .run();
  });
});

describe('fetchTableWorker', () => {
  it('fetch table', () => {
    const fakeRes = {
      status: 200,
      data: {
        tables: { name: 'mes tables' },
      },
    };

    return expectSaga(fetchTablesWorker)
      .provide([[matchers.call.fn(tablesAPI.fetchTables), fakeRes]])
      .put(fetchTables.success({ name: 'mes tables' }))

      .run();
  });

  it('and handles errors', () => {
    const error = new Error('error');

    return expectSaga(fetchTablesWorker)
      .provide([[matchers.call.fn(tablesAPI.fetchTables), throwError(error)]])
      .put(fetchTables.failure('error'))

      .run();
  });
});

describe('updateTableWorker', () => {
  it('update table', () => {
    const action = {
      payload: {
        _id: '12987',
        name: 'Table 2',
      },
    };

    const fakeRes = {
      status: 200,
      data: {
        table: action.payload,
      },
    };

    return expectSaga(updateTableWorker, action)
      .provide([[matchers.call.fn(tablesAPI.updateTable), fakeRes]])
      .put(updateTable.success({ _id: '12987', name: 'Table 2' }))

      .run();
  });

  it('and handles errors', () => {
    const action = {
      payload: {
        _id: '12987',
        name: 'Table 2',
      },
    };
    const error = new Error('error');

    return expectSaga(updateTableWorker, action)
      .provide([[matchers.call.fn(tablesAPI.updateTable), throwError(error)]])
      .put(updateTable.failure('error'))

      .run();
  });
});

describe('deleteTableWorker', () => {
  it('delete table', () => {
    const action = {
      payload: 'tableID',
    };

    const fakeRes = {
      status: 200,
      data: {
        table: { name: 'Table supprimé', _id: action.payload },
      },
    };

    return expectSaga(deleteTableWorker, action)
      .provide([[matchers.call.fn(tablesAPI.deleteTable), fakeRes]])
      .put(deleteTable.success('tableID'))

      .run();
  });

  it('and handles errors', () => {
    const action = {
      payload: 'tableID',
    };
    const error = new Error('error');

    return expectSaga(deleteTableWorker, action)
      .provide([[matchers.call.fn(tablesAPI.deleteTable), throwError(error)]])
      .put(deleteTable.failure('error'))

      .run();
  });
});

it('should calls the addTableWorker', () => {
  testSaga(addTableSaga)
    .next()
    .takeLatest(ADD_TABLE.request, addTableWorker)

    .finish()
    .isDone();
});

it('should calls the fetchTableWorker', () => {
  testSaga(fetchTablesSaga)
    .next()
    .takeLatest(FETCH_TABLES.request, fetchTablesWorker)

    .finish()
    .isDone();
});

it('should calls the updateTableWorker', () => {
  testSaga(updateTableSaga)
    .next()
    .takeLatest(UPDATE_TABLE.request, updateTableWorker)

    .finish()
    .isDone();
});

it('should calls the deleteTableWorker', () => {
  testSaga(deleteTableSaga)
    .next()
    .takeLatest(DELETE_TABLE.request, deleteTableWorker)

    .finish()
    .isDone();
});

it('should calls the table sagas', () => {
  testSaga(tableSagas)
    .next()
    .all([
      fork(addTableSaga),
      fork(fetchTablesSaga),
      fork(updateTableSaga),
      fork(deleteTableSaga),
    ])

    .finish()
    .isDone();
});
