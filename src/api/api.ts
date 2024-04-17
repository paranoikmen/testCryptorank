import axios from 'axios';
import {SortOrder} from '../types/types';

const URL = 'https://api.cryptorank.io/v1';
const API_KEY = '63800a48d1bf8eaf3b45e943dad20f2a9ee9a31fe491ecfca5c4264b9637';

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
