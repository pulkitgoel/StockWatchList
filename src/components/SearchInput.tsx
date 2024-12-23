import { ChangeEvent } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

export function SearchInput({ value, onChange, isLoading }: SearchInputProps) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search stocks..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isLoading && <div className="text-sm text-gray-500">Loading...</div>}
    </div>
  );
}
