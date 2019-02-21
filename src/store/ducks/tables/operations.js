import { call, fork, put, takeLatest, all } from 'redux-saga/effects';

// Import action Types
import { ADD_TABLE, DELETE_TABLE, UPDATE_TABLE, FETCH_TABLES } from '.';

// Import actions Creators
import { addTable, deleteTable, updateTable, fetchTables } from '.';

import * as tablesAPI from '../../APICalls/tablesAPI';

// WORKERS
export function* addTableWorker(action) {
  try {
    const table = action.payload;
    const res = yield call(tablesAPI.createTable, table);
    if (res.status === 200) {
      const table = res.data.table;
      yield put(addTable.success(table));
    }
  } catch (err) {
    yield put(addTable.failure(err.message));
  }
}

export function* updateTableWorker(action) {
  try {
    const table = action.payload;
    const res = yield call(tablesAPI.updateTable, table);
    if (res.status === 200) {
      const table = res.data.table;
      yield put(updateTable.success(table));
    }
  } catch (err) {
    yield put(updateTable.failure(err.message));
  }
}

export function* fetchTablesWorker() {
  try {
    const res = yield call(tablesAPI.fetchTables);
    if (res.status === 200) {
      const tables = res.data.tables;
      yield put(fetchTables.success(tables));
    }
  } catch (err) {
    yield put(fetchTables.failure(err.message));
  }
}

export function* deleteTableWorker(action) {
  try {
    const tableId = action.payload;
    const res = yield call(tablesAPI.deleteTable, tableId);
    if (res.status === 200) {
      const table = res.data.table;
      yield put(deleteTable.success(table._id));
    }
  } catch (err) {
    yield put(deleteTable.failure(err.message));
  }
}

// WATCHERS
export function* addTableSaga() {
  yield takeLatest(ADD_TABLE.request, addTableWorker);
}

export function* updateTableSaga() {
  yield takeLatest(UPDATE_TABLE.request, updateTableWorker);
}

export function* fetchTablesSaga() {
  yield takeLatest(FETCH_TABLES.request, fetchTablesWorker);
}

export function* deleteTableSaga() {
  yield takeLatest(DELETE_TABLE.request, deleteTableWorker);
}

// Export watchers
export default function* drinkSagas() {
  yield all([
    fork(addTableSaga),
    fork(fetchTablesSaga),
    fork(updateTableSaga),
    fork(deleteTableSaga),
  ]);
}
