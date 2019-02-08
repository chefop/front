import {
  actionCreator,
  actionTypes,
  phasedActionCreators,
  phasedActionTypes,
} from './actionsHelper';

describe('action type', () => {
  it('sould returns type with projectName', () => {
    expect(actionTypes('ACTION')).toEqual('front/ACTION');
  });
});

describe('action creator', () => {
  it('sould returns action with only type', () => {
    expect(actionCreator('ACTION')).toEqual({ type: 'ACTION' });
  });

  it('sould returns action with type and payload', () => {
    expect(actionCreator('ACTION', 'payload')).toEqual({
      type: 'ACTION',
      payload: 'payload',
    });
  });

  it('sould returns action with type payload and error', () => {
    expect(actionCreator('ACTION', 'payload', true)).toEqual({
      type: 'ACTION',
      payload: 'payload',
      error: true,
    });
  });
});

describe('phased action type', () => {
  it('sould returns object with 3 states', () => {
    expect(phasedActionTypes('ACTION')).toEqual({
      request: 'front/ACTION_REQUEST',
      success: 'front/ACTION_SUCCESS',
      failure: 'front/ACTION_FAILURE',
    });
  });
});

describe('phased action creator', () => {
  it('should returns object with 3 action creator states', () => {
    expect(
      phasedActionCreators({
        request: 'ACTION_REQUEST',
        success: 'ACTION_SUCCESS',
        failure: 'ACTION_FAILURE',
      }),
    ).toEqual({
      request: expect.any(Function),
      success: expect.any(Function),
      failure: expect.any(Function),
    });
  });
});
