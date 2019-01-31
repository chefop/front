import {
  phasedActionTypes,
  phasedActionCreators,
} from '../../../utils/actionsHelper';

// Action types
export const ADD_STARTER = phasedActionTypes('starter/ADD_STARTER');
export const FETCH_STARTERS = phasedActionTypes('starter/FETCH_STARTER');

// Action creators
export const addStarter = phasedActionCreators(ADD_STARTER);
export const fetchStarters = phasedActionCreators(FETCH_STARTERS);

// Initial State
const initialState = {
  starters: [
    {
      name: 'Salade niçoise 🥗',
      description: 'Une salade faite à Nice',
      DF_Price: 7.4,
      VAT: 0.2,
      quantity: 1000,
      allergen: ['89712982091782091', '109209182901820981'],
      photo:
        'https://img-3.journaldesfemmes.fr/QhgEdLZ0suRdfP7pAM6vG9ECfvo=/750x/smart/3a86b25b4fd94561959d9ff592bce391/recipe-jdf/10025061.jpg',
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
    },
  ],
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
    case ADD_STARTER.failure:
    case FETCH_STARTERS.failure:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default starterReducer;
