import axios from 'axios';
import {SortOrder} from '../types/types';

const URL = 'https://api.cryptorank.io/v1';
const API_KEY = '97ae305d9e11092374ac6a6ce30f97747f28b25b8cbbdb810d7bd0326e89';

export const getCurrencies = async ({
  limit = 10,
  offset = 0,
  sort = SortOrder.Rank,
  symbol,
}: {
  limit: number;
  offset?: number;
  sort?: SortOrder;
  symbol?: string;
}) => {
  const res = await axios.get(`${URL}/currencies`, {
    params: {
      api_key: API_KEY,
      limit,
      offset,
      sort,
      symbol,
    },
  });
  return res.data;
};
