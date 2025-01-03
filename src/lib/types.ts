export interface Item {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface Stock {
  _id: string;
  stockname: string;
  scripcode: string;
  [key: string]: any; // For additional stock properties
}

export interface SearchResult {
  data: Stock[] | Stock | null;
  error: Error | null;
}

export interface stockwatchlist{
  user_id: string;
  stocks: Stock[];
}