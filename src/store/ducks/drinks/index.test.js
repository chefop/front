// Reducer
import drinkReducer from '.';

// Action creators
import { addDrink, fetchDrinks, updateDrink, deleteDrink } from '.';

const initialState = {
  drinks: [],
  error: {},
};

// TODO: replace 'initialState' to undefined
describe('starter reducer', () => {
  it('should return the initial state', () => {
    expect(drinkReducer(initialState, {})).toEqual({
      drinks: [],
      error: {},
    });
  });

  it('should handle addDrink.success', () => {
    expect(
      drinkReducer(initialState, addDrink.success({ name: 'mon entrée' })),
    ).toEqual({
      drinks: [{ name: 'mon entrée' }],
      error: {},
    });
  });

  it('should handle fetchDrinks.success', () => {
    expect(
      drinkReducer(initialState, fetchDrinks.success([{ name: 'mon entrée' }])),
    ).toEqual({
      drinks: [{ name: 'mon entrée' }],
      error: {},
    });
  });

  it('should handle updateDrink.success', () => {
    const initialState = {
      drinks: [{ _id: 'idDrink', name: 'mon entrée' }],
      error: {},
    };
    expect(
      drinkReducer(
        initialState,
        updateDrink.success({ _id: 'idDrink', name: 'nouveau nom' }),
      ),
    ).toEqual({
      drinks: [{ _id: 'idDrink', name: 'nouveau nom' }],
      error: {},
    });
  });

  it('should handle deleteDrink.success', () => {
    const initialState = {
      drinks: [{ _id: 'idDrink' }, { _id: 'idDrink2' }],
      error: {},
    };
    expect(drinkReducer(initialState, deleteDrink.success('idDrink'))).toEqual({
      drinks: [{ _id: 'idDrink2' }],
      error: {},
    });
  });

  it('should handle errors', () => {
    expect(
      drinkReducer(initialState, addDrink.failure('error message')),
    ).toEqual({
      drinks: [],
      error: 'error message',
    });
  });
});
