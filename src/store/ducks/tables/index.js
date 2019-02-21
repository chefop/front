import {
  phasedActionTypes,
  phasedActionCreators,
} from '../../../utils/actionsHelper';

// Action Types
export const ADD_TABLE = phasedActionTypes('table/CREATE_TABLE');
export const FETCH_TABLES = phasedActionTypes('table/FETCH_TABLES');
export const UPDATE_TABLE = phasedActionTypes('table/UPDATE_TABLE');
export const DELETE_TABLE = phasedActionTypes('table/DELETE_TABLE');

// Action Creators
export const addTable = phasedActionCreators(ADD_TABLE);
export const fetchTables = phasedActionCreators(FETCH_TABLES);
export const updateTable = phasedActionCreators(UPDATE_TABLE);
export const deleteTable = phasedActionCreators(DELETE_TABLE);

// Initial State
const initialState = {
  tables: [
    {
      name: 'table 1',
      state: 'available',
      capacity: 4,
    },
    {
      name: 'table 2',
      state: 'occupied',
      capacity: 3,
    },
    {
      name: 'table 3',
      state: 'payed',
      capacity: 6,
    },
  ],
  error: {},
};

// Reducer
const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TABLE.success:
      return {
        ...state,
        tables: [...state.tables, action.payload],
      };
    case FETCH_TABLES.success:
      return {
        ...state,
        tables: action.payload,
      };
    case UPDATE_TABLE.success:
      return {
        ...state,
        tables: [
          ...state.tables.filter((table) => table._id !== action.payload._id),
          action.payload,
        ],
      };
    case DELETE_TABLE.success:
      return {
        ...state,
        tables: [
          ...state.tables.filter((table) => table._id !== action.payload),
        ],
      };
    case ADD_TABLE.failure:
    case FETCH_TABLES.failure:
    case UPDATE_TABLE.failure:
    case DELETE_TABLE.failure:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default tableReducer;
