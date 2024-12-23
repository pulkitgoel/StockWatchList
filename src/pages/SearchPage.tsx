import { useState, useEffect } from 'react';
import { SearchInput } from '../components/SearchInput';
import { SelectedStocks } from '../components/SelectedStocks';
import { SearchSuggestions } from '../components/SearchSuggestions';
import { fetchStockSuggestions, fetchStockData } from '../lib/api';
import type { Stock } from '../lib/types';

export function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Stock[]>([]);
  const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    };

    const timer = setTimeout(handleSearch, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleStockSelect = (stock: Stock) => {
    setSearchTerm(''); // Clear search term
    setSuggestions([]); // Hide suggestions
    setSelectedStocks((prevSelectedStocks) => [...prevSelectedStocks, stock]);
  };

  const handleStockRemove = (stockId: string) => {
    setSelectedStocks((prevSelectedStocks) =>
      prevSelectedStocks.filter((stock) => stock.scripcode !== stockId)
    );
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
        {selectedStocks.length > 0 && (
          <SelectedStocks
            stocks={selectedStocks}
            onRemove={handleStockRemove}
          />
        )}
      </div>
    </div>
  );
}