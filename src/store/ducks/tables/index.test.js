// Reducer
import tableReducer from '.';

// Action creators
import { addTable, fetchTables, updateTable, deleteTable } from '.';

const initialState = {
  tables: [],
  error: {},
};

// TODO: replace 'initialState' to undefined
describe('table reducer', () => {
  it('should return the initial state', () => {
    expect(tableReducer(initialState, {})).toEqual({
      tables: [],
      error: {},
    });
  });

  it('should handle addTable.success', () => {
    expect(
      tableReducer(initialState, addTable.success({ name: 'Table 1' })),
    ).toEqual({
      tables: [{ name: 'Table 1' }],
      error: {},
    });
  });

  it('should handle fetchTables.success', () => {
    expect(
      tableReducer(initialState, fetchTables.success([{ name: 'Table 1' }])),
    ).toEqual({
      tables: [{ name: 'Table 1' }],
      error: {},
    });
  });

  it('should handle updateTable.success', () => {
    const initialState = {
      tables: [{ _id: 'idTable', name: 'Table 1' }],
      error: {},
    };
    expect(
      tableReducer(
        initialState,
        updateTable.success({ _id: 'idTable', name: 'Table 2' }),
      ),
    ).toEqual({
      tables: [{ _id: 'idTable', name: 'Table 2' }],
      error: {},
    });
  });

  it('should handle deleteTable.success', () => {
    const initialState = {
      tables: [{ _id: 'idTable' }, { _id: 'idTable2' }],
      error: {},
    };
    expect(tableReducer(initialState, deleteTable.success('idTable'))).toEqual({
      tables: [{ _id: 'idTable2' }],
      error: {},
    });
  });

  it('should handle errors', () => {
    expect(
      tableReducer(initialState, addTable.failure('error message')),
    ).toEqual({
      tables: [],
      error: 'error message',
    });
  });
});
