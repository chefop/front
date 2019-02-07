import {
  phasedActionTypes,
  phasedActionCreators,
} from '../../../utils/actionsHelper';

// Action Types
export const DELETE_DRINK = phasedActionTypes('drink/DELETE_DRINK');

// Action Creators
export const deleteDrink = phasedActionCreators(DELETE_DRINK);

// Initial State
const initialState = {
  drinks: [
    {
      _id: '6598760982783890273',
      name: 'Ricard ☀️',
      description: "De l'eau et du bonheur",
      df_price: '1.5',
      vat: 20,
      quantity: 15,
      allergen: [],
      photo:
        'https://assets.pernod-ricard.com/savoir-faire_ricard.jpg?PQLANqNze2a3HPiRPfML3hPg21uzm32Z',
      volume: ['657816297891', '87162716389'],
      alcohol: true,
      cold_drink: true,
    },

    {
      _id: '798273089389023',
      name: 'San Pellegrino 🌊',
      description: 'Pour le Ricard',
      df_price: '1.5',
      vat: 20,
      quantity: 789,
      allergen: [],
      photo:
        'https://www.totalwine.com/media/sys_master/twmmedia/h49/hdc/11468000231454.png',
      volume: ['1872873987132', '893728934'],
      alcohol: false,
      cold_drink: true,
    },
  ],
  error: {},
};

// Reducer
const drinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_DRINK.success:
      return {
        ...state,
        drinks: [
          ...state.drinks.filter((drink) => drink._id !== action.payload),
        ],
      };
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
