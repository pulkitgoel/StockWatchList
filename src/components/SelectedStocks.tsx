import type { Stock } from '../lib/types';

interface SelectedStocksProps {
  stocks: Stock[];
  onRemove: (stockId: string) => void;
}

export function SelectedStocks({ stocks, onRemove }: SelectedStocksProps) {
  if (stocks.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {stocks.map((stock) => (
        <div
          key={stock.scripcode}
          className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
        >
          <span>{stock.stockname}</span>
          <button
            onClick={() => onRemove(stock.scripcode)}
            className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-200"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}