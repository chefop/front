import {
  phasedActionTypes,
  phasedActionCreators,
} from '../../../utils/actionsHelper';

// Action types
export const ADD_VOLUME = phasedActionTypes('volume/ADD_VOLUME');
export const FETCH_VOLUMES = phasedActionTypes('volume/FETCH_VOLUME');
export const UPDATE_VOLUME = phasedActionTypes('volume/UPDATE_VOLUME');
export const DELETE_VOLUME = phasedActionTypes('volume/DELETE_VOLUME');

// Action creators
export const addVolume = phasedActionCreators(ADD_VOLUME);
export const fetchVolumes = phasedActionCreators(FETCH_VOLUMES);
export const updateVolume = phasedActionCreators(UPDATE_VOLUME);
export const deleteVolume = phasedActionCreators(DELETE_VOLUME);

// Initial State
const initialState = {
  volumes: [
    { _id: 'volume1', name: 'lactose' },
    { _id: 'volume2', name: 'soy' },
    { _id: 'volume3', name: 'gluten' },
  ],
  error: {},
};

const volumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VOLUME.success:
      return {
        ...state,
        volumes: [...state.volumes, action.payload],
      };
    case FETCH_VOLUMES.success:
      return {
        ...state,
        volumes: action.payload,
      };
    case UPDATE_VOLUME.success:
      return {
        ...state,
        volumes: [
          ...state.volumes.filter(
            (volumes) => volumes._id !== action.payload._id,
          ),
          action.payload,
        ],
      };
    case DELETE_VOLUME.success:
      return {
        ...state,
        volumes: [
          ...state.volumes.filter((volumes) => volumes._id !== action.payload),
        ],
      };
    case ADD_VOLUME.failure:
    case FETCH_VOLUMES.failure:
    case UPDATE_VOLUME.failure:
    case DELETE_VOLUME.failure:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default volumeReducer;
