import { getVolumes } from './selectors';

const state = {
  volume: {
    volumes: [
      {
        _id: 'volume1',
        name: 'soy',
      },
    ],
  },
};

it('sould return the desserts from state', () => {
  expect(getVolumes(state)).toEqual([
    {
      _id: 'volume1',
      name: 'soy',
    },
  ]);
});
