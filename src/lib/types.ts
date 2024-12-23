export interface Item {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface Stock {
  _id: string;
  stockname: string;
  [key: string]: any; // For additional stock properties
}

export interface SearchResult {
  data: Stock[] | Stock | null;
  error: Error | null;
}