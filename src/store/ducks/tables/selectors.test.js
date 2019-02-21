import { getTables } from './selectors';

const state = {
  table: {
    tables: [
      {
        name: 'table 1',
        state: 'available',
        capacity: 4,
      },
      {
        name: 'table 2',
        state: 'occuped',
        capacity: 6,
      },
    ],
  },
};

it('should return the starters from state', () => {
  expect(getTables(state)).toEqual([
    {
      name: 'table 1',
      state: 'available',
      capacity: 4,
    },
    {
      name: 'table 2',
      state: 'occuped',
      capacity: 6,
    },
  ]);
});
