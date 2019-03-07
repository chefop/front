import {
  phasedActionTypes,
  phasedActionCreators,
} from '../../../utils/actionsHelper';

// Action types
export const ADD_STARTER = phasedActionTypes('starter/ADD_STARTER');
export const FETCH_STARTERS = phasedActionTypes('starter/FETCH_STARTERS');
export const UPDATE_STARTER = phasedActionTypes('starter/UPDATE_STARTER');
export const DELETE_STARTER = phasedActionTypes('starter/DELETE_STARTER');

// Action creators
export const addStarter = phasedActionCreators(ADD_STARTER);
export const fetchStarters = phasedActionCreators(FETCH_STARTERS);
export const updateStarter = phasedActionCreators(UPDATE_STARTER);
export const deleteStarter = phasedActionCreators(DELETE_STARTER);

// Initial State
const initialState = {
  starters: [],
  error: {},
};

// Reducer
const starterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STARTER.success:
      return {
        ...state,
        starters: [...state.starters, action.payload],
      };
    case FETCH_STARTERS.success:
      return {
        ...state,
        starters: action.payload,
      };
    case UPDATE_STARTER.success:
      return {
        ...state,
        starters: [
          ...state.starters.filter(
            (starter) => starter._id !== action.payload._id,
          ),
          action.payload,
        ],
      };
    case DELETE_STARTER.success:
      return {
        ...state,
        starters: [
          ...state.starters.filter((starter) => starter._id !== action.payload),
        ],
      };
    case ADD_STARTER.failure:
    case FETCH_STARTERS.failure:
    case UPDATE_STARTER.failure:
    case DELETE_STARTER.failure:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default starterReducer;
