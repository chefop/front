import {
  getDrinks,
  getAvalaibleDrinks,
  getOutOfStockDrinks,
} from './selectors';

const state = {
  drink: {
    drinks: [
      {
        quantity: 12,
        name: 'Volvic',
      },

      {
        quantity: 0,
        name: 'Punch',
      },
    ],
  },
};

it('sould return the drinks from state', () => {
  expect(getDrinks(state)).toEqual([
    {
      quantity: 12,
      name: 'Volvic',
    },
    {
      quantity: 0,
      name: 'Punch',
    },
  ]);
});

it('sould return the available drinks', () => {
  expect(getAvalaibleDrinks(state)).toEqual([
    {
      quantity: 12,
      name: 'Volvic',
    },
  ]);
});

it('sould return the out of stock drinks', () => {
  expect(getOutOfStockDrinks(state)).toEqual([
    {
      quantity: 0,
      name: 'Punch',
    },
  ]);
});
