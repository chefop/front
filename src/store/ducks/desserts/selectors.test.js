import {
  getDesserts,
  getAvalaibleDesserts,
  getOutOfStockDesserts,
} from './selectors';

const state = {
  dessert: {
    desserts: [
      {
        quantity: 12,
        name: 'Browkies',
      },

      {
        quantity: 0,
        name: 'Clafoutie',
      },
    ],
  },
};

it('sould return the desserts from state', () => {
  expect(getDesserts(state)).toEqual([
    {
      quantity: 12,
      name: 'Browkies',
    },
    {
      quantity: 0,
      name: 'Clafoutie',
    },
  ]);
});

it('sould return the available desserts', () => {
  expect(getAvalaibleDesserts(state)).toEqual([
    {
      quantity: 12,
      name: 'Browkies',
    },
  ]);
});

it('sould return the out of stock desserts', () => {
  expect(getOutOfStockDesserts(state)).toEqual([
    {
      quantity: 0,
      name: 'Clafoutie',
    },
  ]);
});
