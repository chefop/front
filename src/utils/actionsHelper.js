import { name as PROJECT_NAME } from '../../package.json';

/**
 * @returns
 * {
 * request: 'action_REQUEST',
 * success: 'action_SUCCESS',
 * failure: 'action_FAILURE'
 * }
 */

export function actionTypes(base) {
  return `${PROJECT_NAME}/${base}`;
}

export function phasedActionTypes(base) {
  return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, type) => {
    acc[type.toLowerCase()] = `${PROJECT_NAME}/${base}_${type}`;
    return acc;
  }, {});
}

export function actionCreator(type = '', payload = false, error = false) {
  return error
    ? { type: type, payload: payload, error: true }
    : payload
    ? { type: type, payload: payload }
    : { type: type };
}

export const phasedActionCreators = (actionType = '') => {
  return {
    request: (payload) => {
      return actionCreator(actionType.request, payload);
    },
    success: (payload) => {
      return actionCreator(actionType.success, payload);
    },
    failure: (error) => {
      return actionCreator(actionType.failure, error, true);
    },
  };
};
