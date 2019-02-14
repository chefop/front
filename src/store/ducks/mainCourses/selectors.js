import { createSelector } from 'reselect';

// Simple
export const getMainCourses = (state) => state.mainCourse.mainCourses;

// Complex
export const getAvalaible = createSelector(
  [getMainCourses],
  (mainCourses) => {
    return mainCourses.filter((mainCourse) => mainCourse.quantity > 0);
  },
);

export const getOutOfStockMainCourses = createSelector(
  [getMainCourses],
  (mainCourses) => {
    return mainCourses.filter((mainCourse) => mainCourse.quantity === 0);
  },
);
