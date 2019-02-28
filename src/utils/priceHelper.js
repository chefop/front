export const priceWithVat = (df_price, vat) => {
  return (df_price * (1 + vat / 100)).toFixed(2);
};

export const priceEuros = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
};
