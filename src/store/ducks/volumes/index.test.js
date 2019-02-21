// Reducer
import volumeReducer from '.';

// Action creators
import { addVolume, fetchVolumes, updateVolume, deleteVolume } from '.';

const initialState = {
  volumes: [],
  error: {},
};

// TODO: replace 'initialState' to undefined
describe('starter reducer', () => {
  it('should return the initial state', () => {
    expect(volumeReducer(initialState, {})).toEqual({
      volumes: [],
      error: {},
    });
  });

  it('should handle addVolume.success', () => {
    expect(
      volumeReducer(initialState, addVolume.success({ name: 'un allergène' })),
    ).toEqual({
      volumes: [{ name: 'un allergène' }],
      error: {},
    });
  });

  it('should handle fetchVolumes.success', () => {
    expect(
      volumeReducer(
        initialState,
        fetchVolumes.success([{ name: 'un allergène' }]),
      ),
    ).toEqual({
      volumes: [{ name: 'un allergène' }],
      error: {},
    });
  });

  it('should handle updateVolume.success', () => {
    const initialState = {
      volumes: [{ _id: 'idVolume', name: 'un allergène' }],
      error: {},
    };
    expect(
      volumeReducer(
        initialState,
        updateVolume.success({ _id: 'idVolume', name: 'nouveau nom' }),
      ),
    ).toEqual({
      volumes: [{ _id: 'idVolume', name: 'nouveau nom' }],
      error: {},
    });
  });

  it('should handle deleteVolume.success', () => {
    const initialState = {
      volumes: [{ _id: 'idVolume' }, { _id: 'idVolume2' }],
      error: {},
    };
    expect(
      volumeReducer(initialState, deleteVolume.success('idVolume')),
    ).toEqual({
      volumes: [{ _id: 'idVolume2' }],
      error: {},
    });
  });

  it('should handle errors', () => {
    expect(
      volumeReducer(initialState, addVolume.failure('error message')),
    ).toEqual({
      volumes: [],
      error: 'error message',
    });
  });
});
