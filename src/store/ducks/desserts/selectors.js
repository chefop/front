import { createSelector } from 'reselect';

//Simple
export const getDesserts = (state) => state.dessert.desserts;

// Complex
export const getAvalaibleDesserts = createSelector(
  [getDesserts],
  (desserts) => {
    return desserts.filter((dessert) => dessert.quantity > 0);
  },
);

export const getOutOfStockDesserts = createSelector(
  [getDesserts],
  (desserts) => {
    return desserts.filter((dessert) => dessert.quantity === 0);
  },
);
