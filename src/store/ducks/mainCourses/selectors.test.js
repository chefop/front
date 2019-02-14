import {
  getMainCourses,
  getAvalaibleMainCourse,
  getOutOfStockMainCourses,
} from './selectors';

const state = {
  mainCourse: {
    mainCourses: [
      {
        quantity: 0,
        name: 'fleischnacka',
      },
      {
        quantity: 12,
        name: 'Lasagne',
      },
    ],
  },
};

it('should return the starters from state', () => {
  expect(getMainCourses(state)).toEqual([
    {
      quantity: 0,
      name: 'fleischnacka',
    },
    {
      quantity: 12,
      name: 'Lasagne',
    },
  ]);
});

it('should return the available starters', () => {
  expect(getAvalaibleMainCourse(state)).toEqual([
    {
      quantity: 12,
      name: 'Lasagne',
    },
  ]);
});

it('should return the out of stock starters', () => {
  expect(getOutOfStockMainCourses(state)).toEqual([
    {
      quantity: 0,
      name: 'fleischnacka',
    },
  ]);
});
