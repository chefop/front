// Reducer
import dessertReducer from '.';

// Action creators
import { addDessert, fetchDesserts, updateDessert, deleteDessert } from '.';

const initialState = {
  desserts: [],
  error: {},
};

// TODO: replace 'initialState' to undefined
describe('starter reducer', () => {
  it('should return the initial state', () => {
    expect(dessertReducer(initialState, {})).toEqual({
      desserts: [],
      error: {},
    });
  });

  it('should handle addDessert.success', () => {
    expect(
      dessertReducer(initialState, addDessert.success({ name: 'mon entrée' })),
    ).toEqual({
      desserts: [{ name: 'mon entrée' }],
      error: {},
    });
  });

  it('should handle fetchDesserts.success', () => {
    expect(
      dessertReducer(
        initialState,
        fetchDesserts.success([{ name: 'mon entrée' }]),
      ),
    ).toEqual({
      desserts: [{ name: 'mon entrée' }],
      error: {},
    });
  });

  it('should handle updateDessert.success', () => {
    const initialState = {
      desserts: [{ _id: 'idDessert', name: 'mon entrée' }],
      error: {},
    };
    expect(
      dessertReducer(
        initialState,
        updateDessert.success({ _id: 'idDessert', name: 'nouveau nom' }),
      ),
    ).toEqual({
      desserts: [{ _id: 'idDessert', name: 'nouveau nom' }],
      error: {},
    });
  });

  it('should handle deleteDessert.success', () => {
    const initialState = {
      desserts: [{ _id: 'idDessert' }, { _id: 'idDessert2' }],
      error: {},
    };
    expect(
      dessertReducer(initialState, deleteDessert.success('idDessert')),
    ).toEqual({
      desserts: [{ _id: 'idDessert2' }],
      error: {},
    });
  });

  it('should handle errors', () => {
    expect(
      dessertReducer(initialState, addDessert.failure('error message')),
    ).toEqual({
      desserts: [],
      error: 'error message',
    });
  });
});
