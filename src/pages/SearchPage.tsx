import { useState, useEffect } from 'react';
import { SearchInput } from '../components/SearchInput';
import { SearchSuggestions } from '../components/SearchSuggestions';
import { fetchStockSuggestions, fetchStockData } from '../lib/api';
import type { Stock } from '../lib/types';

export function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle dynamic search
  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      const { data, error } = await fetchStockSuggestions(searchTerm);
      setIsLoading(false);

      if (data) {
        setSuggestions(Array.isArray(data) ? data : [data]);
      } else if (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    };    // Debounce the search (300ms delay)
    const timer = setTimeout(handleSearch, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle selection of a stock
  const handleStockSelect = async (stock: Stock) => {
    setSearchTerm(stock.stockname); // Set stock name in textbox
    setSuggestions([]); // Hide suggestions
    setIsLoading(true);

    const { data, error } = await fetchStockData(stock._id); // Fetch full stock details
    setIsLoading(false);

    if (data) {
      setSelectedStock(data as Stock);
    } else if (error) {
      console.error('Error fetching stock data:', error);
    }
  };
  
  return (
    <div className="p-6">
      <div className="max-w-xl mx-auto">
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          isLoading={isLoading}
        />
        {suggestions.length > 0 && (
          <SearchSuggestions
            suggestions={suggestions}
            onSelect={handleStockSelect}
          />
        )}
        {selectedStock && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-100">
            <h2 className="text-lg font-bold">{selectedStock.stockname}</h2>
            <p>Details: {JSON.stringify(selectedStock)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
