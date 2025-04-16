
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = 'Search for books, notes, papers...' }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-20 pl-4 py-3 bg-white border-library-blue-200 focus:border-library-blue-400 focus:ring-library-blue-300 w-full"
        />
        <Button 
          type="submit" 
          className="absolute right-0 bg-library-blue-700 hover:bg-library-blue-800"
          size="sm"
        >
          <Search className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
