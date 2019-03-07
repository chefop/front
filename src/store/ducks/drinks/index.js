import {
  phasedActionTypes,
  phasedActionCreators,
} from '../../../utils/actionsHelper';

// Action Types
export const ADD_DRINK = phasedActionTypes('drink/CREATE_DRINK');
export const FETCH_DRINKS = phasedActionTypes('drink/FETCH_DRINKS');
export const UPDATE_DRINK = phasedActionTypes('drink/UPDATE_DRINK');
export const DELETE_DRINK = phasedActionTypes('drink/DELETE_DRINK');

// Action Creators
export const addDrink = phasedActionCreators(ADD_DRINK);
export const fetchDrinks = phasedActionCreators(FETCH_DRINKS);
export const updateDrink = phasedActionCreators(UPDATE_DRINK);
export const deleteDrink = phasedActionCreators(DELETE_DRINK);

// Initial State
const initialState = {
  drinks: [],
  error: {},
};

// Reducer
const drinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DRINK.success:
      return {
        ...state,
        drinks: [...state.drinks, action.payload],
      };
    case FETCH_DRINKS.success:
      return {
        ...state,
        drinks: action.payload,
      };
    case UPDATE_DRINK.success:
      return {
        ...state,
        drinks: [
          ...state.drinks.filter((drink) => drink._id !== action.payload._id),
          action.payload,
        ],
      };
    case DELETE_DRINK.success:
      return {
        ...state,
        drinks: [
          ...state.drinks.filter((drink) => drink._id !== action.payload),
        ],
      };
    case ADD_DRINK.failure:
    case FETCH_DRINKS.failure:
    case UPDATE_DRINK.failure:
    case DELETE_DRINK.failure:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default drinkReducer;
