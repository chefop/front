// Reducer
import starterReducer from '.';

// Action creators
import { addStarter, fetchStarters, updateStarter, deleteStarter } from '.';

const initialState = {
  starters: [],
  error: {},
};

// TODO: replace 'initialState' to undefined
describe('starter reducer', () => {
  it('should return the initial state', () => {
    expect(starterReducer(initialState, {})).toEqual({
      starters: [],
      error: {},
    });
  });

  it('should handle addStarter.success', () => {
    expect(
      starterReducer(initialState, addStarter.success({ name: 'mon entrée' })),
    ).toEqual({
      starters: [{ name: 'mon entrée' }],
      error: {},
    });
  });

  it('should handle fetchStarters.success', () => {
    expect(
      starterReducer(
        initialState,
        fetchStarters.success([{ name: 'mon entrée' }]),
      ),
    ).toEqual({
      starters: [{ name: 'mon entrée' }],
      error: {},
    });
  });

  it('should handle updateStarter.success', () => {
    const initialState = {
      starters: [{ _id: 'idStarter', name: 'mon entrée' }],
      error: {},
    };
    expect(
      starterReducer(
        initialState,
        updateStarter.success({ _id: 'idStarter', name: 'nouveau nom' }),
      ),
    ).toEqual({
      starters: [{ _id: 'idStarter', name: 'nouveau nom' }],
      error: {},
    });
  });

  it('should handle deleteStarter.success', () => {
    const initialState = {
      starters: [{ _id: 'idStarter' }, { _id: 'idStarter2' }],
      error: {},
    };
    expect(
      starterReducer(initialState, deleteStarter.success('idStarter')),
    ).toEqual({
      starters: [{ _id: 'idStarter2' }],
      error: {},
    });
  });

  it('should handle errors', () => {
    expect(
      starterReducer(initialState, addStarter.failure('error message')),
    ).toEqual({
      starters: [],
      error: 'error message',
    });
  });
});
