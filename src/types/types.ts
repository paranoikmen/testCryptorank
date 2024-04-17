export enum SortOrder {
  Rank = 'rank',
  RankDescending = '-rank',
  Price = 'price',
  PriceDescending = '-price',
}

export type Currency = {
  id: number;
  rank: number;
  slug: string;
  name: string;
  symbol: string;
  category: string;
  type: string;
  volume24hBase: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  values: Values;
  lastUpdated: string;
  tokens: any[];
};

export type Values = {
  USD: Usd;
};

export type Usd = {
  price: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  marketCap: number;
  percentChange24h: number;
  percentChange7d: number;
  percentChange30d: number;
  percentChange3m: number;
  percentChange6m: number;
};
