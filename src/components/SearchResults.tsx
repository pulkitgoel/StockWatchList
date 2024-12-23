interface Item {
  id: string;
  name: string;
  description: string;
}

interface SearchResultsProps {
  results: Item[];
}

export function SearchResults({ results }: SearchResultsProps) {
  if (results.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Results</h2>
      <div className="space-y-4">
        {results.map((item) => (
          <div
            key={item.id}
            className="p-4 border border-gray-200 rounded-lg"
          >
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}