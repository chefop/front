import {
  phasedActionTypes,
  phasedActionCreators,
} from '../../../utils/actionsHelper';

// Action types
export const ADD_ALLERGEN = phasedActionTypes('allergen/ADD_ALLERGEN');
export const FETCH_ALLERGENS = phasedActionTypes('allergen/FETCH_ALLERGEN');
export const UPDATE_ALLERGEN = phasedActionTypes('allergen/UPDATE_ALLERGEN');
export const DELETE_ALLERGEN = phasedActionTypes('allergen/DELETE_ALLERGEN');

// Action creators
export const addAllergen = phasedActionCreators(ADD_ALLERGEN);
export const fetchAllergens = phasedActionCreators(FETCH_ALLERGENS);
export const updateAllergen = phasedActionCreators(UPDATE_ALLERGEN);
export const deleteAllergen = phasedActionCreators(DELETE_ALLERGEN);

// Initial State
const initialState = {
  allergens: [
    { _id: 'allergen1', name: 'lactose' },
    { _id: 'allergen2', name: 'soy' },
    { _id: 'allergen3', name: 'gluten' },
  ],
  error: {},
};

const allergenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALLERGEN.success:
      return {
        ...state,
        allergens: [...state.allergens, action.payload],
      };
    case FETCH_ALLERGENS.success:
      return {
        ...state,
        allergens: action.payload,
      };
    case UPDATE_ALLERGEN.success:
      return {
        ...state,
        allergens: [
          ...state.allergens.filter(
            (allergens) => allergens._id !== action.payload._id,
          ),
          action.payload,
        ],
      };
    case DELETE_ALLERGEN.success:
      return {
        ...state,
        allergens: [
          ...state.allergens.filter(
            (allergens) => allergens._id !== action.payload,
          ),
        ],
      };
    case ADD_ALLERGEN.failure:
    case FETCH_ALLERGENS.failure:
    case UPDATE_ALLERGEN.failure:
    case DELETE_ALLERGEN.failure:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default allergenReducer;
