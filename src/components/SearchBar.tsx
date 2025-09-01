import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [q, setQ] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      onSearch(q.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center">
        <div className="absolute left-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 12.414a4.5 4.5 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" />
          </svg>
        </div>
        
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search for a city or location..."
          className="w-full pl-12 pr-24 py-4 text-lg border-0 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:shadow-2xl transition-all duration-300 placeholder-gray-400"
        />
        
        <button
          type="submit"
          className="absolute right-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!q.trim()}
        >
          Search
        </button>
      </div>
    </form>
  );
}
