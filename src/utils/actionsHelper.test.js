import { name as PROJECT_NAME } from '../../package.json';
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
  it('sould returns action with type payload and error', () => {
    expect(actionCreator('ACTION', 'payload', true)).toEqual({
      type: 'ACTION',
      payload: 'payload',
      error: true,
    });
  });

  it('sould returns action with only type', () => {
    expect(actionCreator('ACTION')).toEqual({ type: 'ACTION' });
  });

  it('sould returns action with type and payload', () => {
    expect(actionCreator('ACTION', 'payload')).toEqual({
      type: 'ACTION',
      payload: 'payload',
    });
  });
});

describe('phased action type', () => {
  it('sould returns object with 3 states', () => {
    expect(phasedActionTypes('ACTION')).toEqual({
      request: `${PROJECT_NAME}/ACTION_REQUEST`,
      success: `${PROJECT_NAME}/ACTION_SUCCESS`,
      failure: `${PROJECT_NAME}/ACTION_FAILURE`,
    });
  });
});

describe('phased action creator', () => {
  it('should returns object with 3 properties', () => {
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

  it('should returns 3 action creator', () => {
    const { request, success, failure } = phasedActionCreators({
      request: 'ACTION_REQUEST',
      success: 'ACTION_SUCCESS',
      failure: 'ACTION_FAILURE',
    });
    expect(request('payload')).toEqual({
      type: 'ACTION_REQUEST',
      payload: 'payload',
    });

    expect(success('payload')).toEqual({
      type: 'ACTION_SUCCESS',
      payload: 'payload',
    });

    expect(failure('error')).toEqual({
      type: 'ACTION_FAILURE',
      payload: 'error',
      error: true,
    });
  });

  it('should calls the action creator', () => {
    jest.mock('./actionsHelper.js', () => {
      return { phasedActionCreators: jest.fn() };
    });

    const { request, success, failure } = phasedActionCreators({
      request: 'ACTION_REQUEST',
      success: 'ACTION_SUCCESS',
      failure: 'ACTION_FAILURE',
    });
    expect(request('payload')).toEqual({
      type: 'ACTION_REQUEST',
      payload: 'payload',
    });

    expect(success('payload')).toEqual({
      type: 'ACTION_SUCCESS',
      payload: 'payload',
    });

    expect(failure('error')).toEqual({
      type: 'ACTION_FAILURE',
      payload: 'error',
      error: true,
    });
  });
});
