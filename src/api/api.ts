import axios from 'axios';
import {SortOrder} from '../types/types';

const URL = 'https://api.cryptorank.io/v1';
const API_KEY = '97ae305d9e11092374ac6a6ce30f97747f28b25b8cbbdb810d7bd0326e89';

export const getCurrencies = async ({
  limit = 10,
  offset = 0,
  sort = SortOrder.Rank,
  symbols,
}: {
  limit: number;
  offset?: number;
  sort?: SortOrder;
  symbols?: string;
}) => {
  console.log(limit,
    offset,
    sort ,
    symbols,);
  const res = await axios.get(`${URL}/currencies`, {
    params: {
      api_key: API_KEY,
      limit,
      offset,
      sort,
      ...(symbols && {symbols}),
    },
  });
  return res.data;
};
