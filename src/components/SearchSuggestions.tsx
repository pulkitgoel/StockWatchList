import type { Stock } from '../lib/types';

interface SearchSuggestionsProps {
  suggestions: Stock[];
  onSelect: (stock: Stock) => void;
}

export function SearchSuggestions({ suggestions, onSelect }: SearchSuggestionsProps) {
  return (
    <ul className="border border-gray-300 rounded-lg mt-2 bg-white">
      {suggestions.map((stock) => (
        <li
          key={stock.scripcode}
          onClick={() => onSelect(stock)}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {stock.stockname}
        </li>
      ))}
    </ul>
  );
}
