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

it('should return the starters from state', () => {
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

it('should return the available starters', () => {
  expect(getAvalaibleStarters(state)).toEqual([
    {
      quantity: 12,
      name: 'Salade',
    },
  ]);
});

it('should return the out of stock starters', () => {
  expect(getOutOfStockStarters(state)).toEqual([
    {
      quantity: 0,
      name: 'Paté',
    },
  ]);
});
