import { createSelector } from 'reselect';

// Simple
export const getStarters = (state) => state.starter.starters;

// Complex
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
