import { getAllergens } from './selectors';

const state = {
  allergen: {
    allergens: [
      {
        _id: 'allergen1',
        name: 'soy',
      },
    ],
  },
};

it('sould return the desserts from state', () => {
  expect(getAllergens(state)).toEqual([
    {
      _id: 'allergen1',
      name: 'soy',
    },
  ]);
});
