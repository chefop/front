import { createSelector } from 'reselect';

export const getStarters = (state) => state.starter.starters;

export const getAvalaibleStarters = createSelector(
  [getStarters],
  (starters) => {
    return starters.filter((starter) => starter.quantity > 0);
  },
);

export const getOutOfStockStarters = createSelector(
  [getStarters],
  (starters) => {
    return starters.filter((starter) => starter.quantity === 0);
  },
);
