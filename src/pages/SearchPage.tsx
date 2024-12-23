import { useState, useEffect } from 'react';
import { SearchInput } from '../components/SearchInput';
import { SelectedStocks } from '../components/SelectedStocks';
import { SearchSuggestions } from '../components/SearchSuggestions';
import { fetchStockSuggestions, saveSelectedStocks } from '../lib/api';
import type { Stock } from '../lib/types';

export function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Stock[]>([]);
  const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleUpdateWishlist = async () => {
    setIsUpdating(true);
    try {
      const response = await saveSelectedStocks(selectedStocks);
      if (response.error) {
        console.error('Error saving wishlist:', response.error);
      } else {
        console.log('Wishlist updated successfully');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    } finally {
      setIsUpdating(false);
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
        {selectedStocks.length > 0 && (
          <SelectedStocks
            stocks={selectedStocks}
            onRemove={handleStockRemove}
          />
        )}
        <button
          onClick={handleUpdateWishlist}
          className={`mt-4 px-4 py-2 rounded-lg ${
            selectedStocks.length === 0 || isUpdating
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-blue-500 text-white'
          }`}
          disabled={selectedStocks.length === 0}
        >
          {isUpdating ? 'Updating...' : 'Update Wishlist'}
        </button>
      </div>
    </div>
  );
}