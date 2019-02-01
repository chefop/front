import {
  phasedActionTypes,
  phasedActionCreators,
} from '../../../utils/actionsHelper';

// Action types
export const ADD_MAIN = phasedActionTypes('main/ADD_MAIN');
export const FETCH_MAINS = phasedActionTypes('main/FETCH_MAIN');
export const UPDATE_MAIN = phasedActionTypes('main/UPDATE_MAIN');
export const DELETE_MAIN = phasedActionTypes('main/DELETE_MAIN');

// Action creators
export const addMain = phasedActionCreators(ADD_MAIN);
export const fetchMains = phasedActionCreators(FETCH_MAINS);
export const updateMain = phasedActionCreators(UPDATE_MAIN);
export const deleteMain = phasedActionCreators(DELETE_MAIN);

// Initial State
const initialState = {
  mains: [
    {
      name: 'Salade niçoise 🥗',
      description: 'Une salade faite à Nice',
      DF_Price: 7.4,
      VAT: 0.2,
      quantity: 1000,
      allergen: ['89712982091782091', '109209182901820981'],
      photo:
        'https://img-3.journaldesfemmes.fr/QhgEdLZ0suRdfP7pAM6vG9ECfvo=/750x/smart/3a86b25b4fd94561959d9ff592bce391/recipe-jdf/10025061.jpg',
      _id: '891728109831',
    },
    {
      name: 'Foie gras 🦆',
      description:
        'Il était une fois un foie se prêtant ma foi à une degustation foireuse.',
      DF_Price: 10.3,
      VAT: 0.2,
      quantity: 78,
      allergen: [],
      photo:
        'https://static.fermedebeaumont.com/images/fermedebeaumont/mandarin-logo/mandarin4.jpg',
      _id: '908098327467072',
    },

    {
      name: 'On a tenté un truc 🐐',
      description:
        "C'est la surprise (C'est un millefeuille… Avec de la betterave… et du fromage de chèvre…)",
      DF_Price: 10.3,
      VAT: 0.2,
      quantity: 2,
      allergen: ['65129661278961726071', '7630729072096378672'],
      photo:
        'https://www.papillesetpupilles.fr/wp-content/uploads/2010/03/Millefeuille-de-betterave-au-fromage-de-chevre-600x792.jpg',
      _id: '75065673709092536',
    },
  ],
  error: {},
};

// Reducer
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MAIN.success:
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
