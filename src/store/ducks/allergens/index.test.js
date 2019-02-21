// Reducer
import allergenReducer from '.';

// Action creators
import { addAllergen, fetchAllergens, updateAllergen, deleteAllergen } from '.';

const initialState = {
  allergens: [],
  error: {},
};

// TODO: replace 'initialState' to undefined
describe('starter reducer', () => {
  it('should return the initial state', () => {
    expect(allergenReducer(initialState, {})).toEqual({
      allergens: [],
      error: {},
    });
  });

  it('should handle addAllergen.success', () => {
    expect(
      allergenReducer(
        initialState,
        addAllergen.success({ name: 'un allergène' }),
      ),
    ).toEqual({
      allergens: [{ name: 'un allergène' }],
      error: {},
    });
  });

  it('should handle fetchAllergens.success', () => {
    expect(
      allergenReducer(
        initialState,
        fetchAllergens.success([{ name: 'un allergène' }]),
      ),
    ).toEqual({
      allergens: [{ name: 'un allergène' }],
      error: {},
    });
  });

  it('should handle updateAllergen.success', () => {
    const initialState = {
      allergens: [{ _id: 'idAllergen', name: 'un allergène' }],
      error: {},
    };
    expect(
      allergenReducer(
        initialState,
        updateAllergen.success({ _id: 'idAllergen', name: 'nouveau nom' }),
      ),
    ).toEqual({
      allergens: [{ _id: 'idAllergen', name: 'nouveau nom' }],
      error: {},
    });
  });

  it('should handle deleteAllergen.success', () => {
    const initialState = {
      allergens: [{ _id: 'idAllergen' }, { _id: 'idAllergen2' }],
      error: {},
    };
    expect(
      allergenReducer(initialState, deleteAllergen.success('idAllergen')),
    ).toEqual({
      allergens: [{ _id: 'idAllergen2' }],
      error: {},
    });
  });

  it('should handle errors', () => {
    expect(
      allergenReducer(initialState, addAllergen.failure('error message')),
    ).toEqual({
      allergens: [],
      error: 'error message',
    });
  });
});
