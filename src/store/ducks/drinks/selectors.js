import { createSelector } from 'reselect';

// Simple
export const getDrinks = (state) => state.drink.drinks;

// Complex
export const getAvalaibleDrinks = createSelector(
  [getDrinks],
  (drinks) => {
    return drinks.filter((drink) => drink.quantity > 0);
  },
);

export const getOutOfStockDrinks = createSelector(
  [getDrinks],
  (drinks) => {
    return drinks.filter((drink) => drink.quantity === 0);
  },
);
