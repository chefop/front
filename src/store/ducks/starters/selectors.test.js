import {
  getStarters,
  getAvalaibleStarters,
  getOutOfStockStarters,
} from './selectors';

const state = {
  starter: {
    starters: [
      {
        quantity: 12,
        name: 'Salade',
      },

      {
        quantity: 0,
        name: 'Paté',
      },
    ],
  },
};

it('sould return the starters from state', () => {
  expect(getStarters(state)).toEqual([
    {
      quantity: 12,
      name: 'Salade',
    },
    {
      quantity: 0,
      name: 'Paté',
    },
  ]);
});

it('sould return the available starters', () => {
  expect(getAvalaibleStarters(state)).toEqual([
    {
      quantity: 12,
      name: 'Salade',
    },
  ]);
});

it('sould return the out of stock starters', () => {
  expect(getOutOfStockStarters(state)).toEqual([
    {
      quantity: 0,
      name: 'Paté',
    },
  ]);
});
