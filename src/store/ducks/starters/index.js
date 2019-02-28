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
  starters: [
    {
      name: 'Salade niçoise 🥗',
      description: 'Une salade faite à Nice',
      df_price: 7.4,
      vat: 0.2,
      quantity: 1000,
      allergen: [{ _id: '312223', name: 'noix de pécan' }],
      photo:
        'https://img-3.journaldesfemmes.fr/QhgEdLZ0suRdfP7pAM6vG9ECfvo=/750x/smart/3a86b25b4fd94561959d9ff592bce391/recipe-jdf/10025061.jpg',
      _id: '891728109831',
    },
    {
      name: 'Foie gras 🦆',
      description:
        'Il était une fois un foie se prêtant ma foi à une degustation foireuse.',
      df_price: 10.3,
      vat: 0.2,
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
      df_price: 10.3,
      vat: 0.2,
      quantity: 2,
      allergen: [
        { _id: '1233123', name: 'lactose' },
        { _id: '123311322223', name: 'gluten' },
        { _id: '12331223', name: 'noix' },
        { _id: '123312223', name: 'fruit à coque' },
        { _id: '1233fgd12232223', name: 'farine' },
        { _id: '123312223', name: 'fruit de mer' },
      ],
      photo:
        'https://www.papillesetpupilles.fr/wp-content/uploads/2010/03/Millefeuille-de-betterave-au-fromage-de-chevre-600x792.jpg',
      _id: '75065673709092536',
    },
    {
      name: 'Salade niçoise 🥗',
      description: 'Une salade faite à Nice',
      df_price: 7.4,
      vat: 0.2,
      quantity: 1000,
      allergen: [{ _id: '312223', name: 'noix de pécan' }],
      photo:
        'https://img-3.journaldesfemmes.fr/QhgEdLZ0suRdfP7pAM6vG9ECfvo=/750x/smart/3a86b25b4fd94561959d9ff592bce391/recipe-jdf/10025061.jpg',
      _id: '891728109831',
    },
    {
      name: 'Foie gras 🦆',
      description:
        'Il était une fois un foie se prêtant ma foi à une degustation foireuse.',
      df_price: 10.3,
      vat: 0.2,
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
      df_price: 10.3,
      vat: 0.2,
      quantity: 2,
      allergen: [
        { _id: '1233123', name: 'lactose' },
        { _id: '123311322223', name: 'gluten' },
        { _id: '12331223', name: 'noix' },
        { _id: '123312223', name: 'fruit à coque' },
        { _id: '1233fgd12232223', name: 'farine' },
        { _id: '123312223', name: 'fruit de mer' },
      ],
      photo:
        'https://www.papillesetpupilles.fr/wp-content/uploads/2010/03/Millefeuille-de-betterave-au-fromage-de-chevre-600x792.jpg',
      _id: '75065673709092536',
    },
    {
      name: 'Salade niçoise 🥗',
      description: 'Une salade faite à Nice',
      df_price: 7.4,
      vat: 0.2,
      quantity: 1000,
      allergen: [{ _id: '312223', name: 'noix de pécan' }],
      photo:
        'https://img-3.journaldesfemmes.fr/QhgEdLZ0suRdfP7pAM6vG9ECfvo=/750x/smart/3a86b25b4fd94561959d9ff592bce391/recipe-jdf/10025061.jpg',
      _id: '891728109831',
    },
    {
      name: 'Foie gras 🦆',
      description:
        'Il était une fois un foie se prêtant ma foi à une degustation foireuse.',
      df_price: 10.3,
      vat: 0.2,
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
      df_price: 10.3,
      vat: 0.2,
      quantity: 2,
      allergen: [
        { _id: '1233123', name: 'lactose' },
        { _id: '123311322223', name: 'gluten' },
        { _id: '12331223', name: 'noix' },
        { _id: '123312223', name: 'fruit à coque' },
        { _id: '1233fgd12232223', name: 'farine' },
        { _id: '123312223', name: 'fruit de mer' },
      ],
      photo:
        'https://www.papillesetpupilles.fr/wp-content/uploads/2010/03/Millefeuille-de-betterave-au-fromage-de-chevre-600x792.jpg',
      _id: '75065673709092536',
    },
    {
      name: 'Salade niçoise 🥗',
      description: 'Une salade faite à Nice',
      df_price: 7.4,
      vat: 0.2,
      quantity: 1000,
      allergen: [{ _id: '312223', name: 'noix de pécan' }],
      photo:
        'https://img-3.journaldesfemmes.fr/QhgEdLZ0suRdfP7pAM6vG9ECfvo=/750x/smart/3a86b25b4fd94561959d9ff592bce391/recipe-jdf/10025061.jpg',
      _id: '891728109831',
    },
    {
      name: 'Foie gras 🦆',
      description:
        'Il était une fois un foie se prêtant ma foi à une degustation foireuse.',
      df_price: 10.3,
      vat: 0.2,
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
      df_price: 10.3,
      vat: 0.2,
      quantity: 2,
      allergen: [
        { _id: '1233123', name: 'lactose' },
        { _id: '123311322223', name: 'gluten' },
        { _id: '12331223', name: 'noix' },
        { _id: '123312223', name: 'fruit à coque' },
        { _id: '1233fgd12232223', name: 'farine' },
        { _id: '123312223', name: 'fruit de mer' },
      ],
      photo:
        'https://www.papillesetpupilles.fr/wp-content/uploads/2010/03/Millefeuille-de-betterave-au-fromage-de-chevre-600x792.jpg',
      _id: '75065673709092536',
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
