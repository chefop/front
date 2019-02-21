import {
  phasedActionTypes,
  phasedActionCreators,
} from '../../../utils/actionsHelper';

// Action types
export const ADD_DESSERT = phasedActionTypes('dessert/ADD_DESSERT');
export const FETCH_DESSERTS = phasedActionTypes('dessert/FETCH_DESSERT');
export const UPDATE_DESSERT = phasedActionTypes('dessert/UPDATE_DESSERT');
export const DELETE_DESSERT = phasedActionTypes('dessert/DELETE_DESSERT');

// Action creators
export const addDessert = phasedActionCreators(ADD_DESSERT);
export const fetchDesserts = phasedActionCreators(FETCH_DESSERTS);
export const updateDessert = phasedActionCreators(UPDATE_DESSERT);
export const deleteDessert = phasedActionCreators(DELETE_DESSERT);

// Initial State
const initialState = {
  desserts: [
    {
      name: 'Crêpe au sucre',
      description:
        'Tu as de la pate ? Tu as du sucre ? Beh tu met la pate avec du suc dessus',
      dfPrice: 2.8,
      vat: 0.2,
      quantity: 46,
      allergen: ['allergen1', 'allergen3'],
      photo:
        'https://www.recettes.net/documents/upload/original/c/r/crepe-au-sucre.jpg',
    },
    {
      name: 'Browkies',
      description:
        'Un genre de Brownie au Cookies. En vrai, de toi à moi, une tuerie !!',
      dfPrice: 2.5,
      vat: 0.2,
      quantity: 24,
      allergen: ['allergen1'],
      photo:
        'https://static.cuisineaz.com/400x320/i140676-brownie-cookie-chocolat-noix-de-pecan.jpeg',
    },
  ],
  error: {},
};

const dessertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DESSERT.success:
      return {
        ...state,
        desserts: [...state.desserts, action.payload],
      };
    case FETCH_DESSERTS.success:
      return {
        ...state,
        desserts: action.payload,
      };
    case UPDATE_DESSERT.success:
      return {
        ...state,
        desserts: [
          ...state.desserts.filter(
            (desserts) => desserts._id !== action.payload._id,
          ),
          action.payload,
        ],
      };
    case DELETE_DESSERT.success:
      return {
        ...state,
        desserts: [
          ...state.desserts.filter(
            (desserts) => desserts._id !== action.payload,
          ),
        ],
      };
    case ADD_DESSERT.failure:
    case FETCH_DESSERTS.failure:
    case UPDATE_DESSERT.failure:
    case DELETE_DESSERT.failure:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default dessertReducer;
