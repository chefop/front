import {
  phasedActionTypes,
  phasedActionCreators,
} from '../../../utils/actionsHelper';

// Action types
export const ADD_MAIN = phasedActionTypes('main/ADD_MAIN');
export const FETCH_MAIN = phasedActionTypes('main/FETCH_MAIN');
export const FETCH_MAINS = phasedActionTypes('main/FETCH_MAINS');
export const UPDATE_MAIN = phasedActionTypes('main/UPDATE_MAIN');
export const DELETE_MAIN = phasedActionTypes('main/DELETE_MAIN');

// Action creators
export const addMain = phasedActionCreators(ADD_MAIN);
export const fetchMains = phasedActionCreators(FETCH_MAINS);
export const fetchMain = phasedActionCreators(FETCH_MAIN);
export const updateMain = phasedActionCreators(UPDATE_MAIN);
export const deleteMain = phasedActionCreators(DELETE_MAIN);

// Initial State
const initialState = {
  mains: [
    {
      name: 'Steak frites 🥩🍟',
      description: 'Un steak avec des frites',
      DF_Price: 14,
      VAT: 0.2,
      quantity: 25,
      allergen: ['9084090324', '8798320480234'],
      photo:
        'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg',
      _id: '87982898094923',
    },
    {
      name: 'Tartiflette 🧀',
      description: 'Du fromage à la patate avec des lardons, genre beaucoup.',
      DF_Price: 17,
      VAT: 0.2,
      quantity: 0,
      allergen: [],
      photo:
        'https://image.afcdn.com/recipe/20160401/38946_w1024h768c1cx2690cy1793.jpg',
      _id: '90809832769787298427467072',
    },

    {
      name: 'Bœuf bourgignon 🥟',
      description: "Comme l'indique l'emoji, c'est un sauté de canard laqué",
      DF_Price: 15.5,
      VAT: 0.2,
      quantity: 2,
      allergen: ['89173987408293'],
      photo:
        'https://static.cuisineaz.com/610x610/i94631-boeuf-bourguignon.jpg',
      _id: '90840932834234',
    },
  ],
  error: {},
};

// Reducer
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MAIN.success:
    case FETCH_MAIN.success:
      return {
        ...state,
        mains: [...state.mains, action.payload],
      };
    case FETCH_MAINS.success:
      return {
        ...state,
        mains: action.payload,
      };
    case UPDATE_MAIN.success:
      return {
        ...state,
        mains: [
          ...state.mains.filter((main) => main._id !== action.payload._id),
          action.payload,
        ],
      };
    case DELETE_MAIN.success:
      return {
        ...state,
        mains: [...state.mains.filter((main) => main._id !== action.payload)],
      };
    case ADD_MAIN.failure:
    case FETCH_MAIN.failure:
    case FETCH_MAINS.failure:
    case UPDATE_MAIN.failure:
    case DELETE_MAIN.failure:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;
