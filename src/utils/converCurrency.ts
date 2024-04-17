import {Currency} from '../types/types';

export const convertCurrency = (
  amount: number,
  firstCurrency: Currency,
  secondCurrency: Currency,
) => {
  const exchangeRate =
    firstCurrency.values.USD.price / secondCurrency.values.USD.price;
  return exchangeRate * amount;
};
