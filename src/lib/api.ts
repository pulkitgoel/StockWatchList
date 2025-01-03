import type { SearchResult, Stock, stockwatchlist } from './types';

// Replace with your FastAPI URL
const API_BASE_URL = 'http://localhost:8006/api/v1'; // Update to your FastAPI server URL if needed

// Fetch stock suggestions from the FastAPI backend
export async function fetchStockSuggestions(searchTerm: string): Promise<SearchResult> {
  try {
    // Call the FastAPI endpoint to get stock suggestions
    const response = await fetch(`${API_BASE_URL}/stocks/suggestions?search_term=${searchTerm}`);
    
    // Check if the response was successful
    if (!response.ok) {
      throw new Error('Failed to fetch stock suggestions');
    }

    // Parse the response data
    const data = await response.json();
    return { data: data.data, error: null };
  } catch (err) {
    console.error('Error fetching stock suggestions:', err);
    return { data: null, error: err as Error };
  }
}

// Fetch stock data by ID from the FastAPI backend
export async function fetchStockData(stockId: string): Promise<SearchResult> {
  try {
    // Call the FastAPI endpoint to get stock data by ID
    const response = await fetch(`${API_BASE_URL}/stocks/${stockId}`);
    
    // Check if the response was successful
    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }

    // Parse the response data
    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    console.error('Error fetching stock data:', err);
    return { data: null, error: err as Error };
  }
}

// Save selected stocks to the database
export async function saveSelectedStocks(stocks: Stock[]): Promise<SearchResult> {
  try {
    const watchlist = {
      user_id: "1",
      stocks: stocks,
    };

    // Call the FastAPI endpoint to save selected stocks
    const response = await fetch(`${API_BASE_URL}/stocks/watchlist/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(watchlist ),
    });

    // Check if the response was successful
    if (!response.ok) {
      throw new Error('Failed to save selected stocks');
    }

    // Parse the response data
    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    console.error('Error saving selected stocks:', err);
    return { data: null, error: err as Error };
  }
}