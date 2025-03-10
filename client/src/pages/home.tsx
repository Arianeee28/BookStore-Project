import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/search-bar";
import { BookCard } from "@/components/book-card";
import { useState } from "react";
import { type Book } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: featuredBooks, isLoading: featuredLoading } = useQuery<Book[]>({
    queryKey: ["/api/books/featured"],
  });

  const { data: trendingBooks, isLoading: trendingLoading } = useQuery<Book[]>({
    queryKey: ["/api/books/trending"],
  });

  const { data: searchResults, isLoading: searchLoading } = useQuery<Book[]>({
    queryKey: ["/api/books/search", { q: searchQuery }],
    enabled: searchQuery.length > 0,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (featuredLoading || trendingLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {searchQuery ? (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Search Results</h2>
          {searchLoading ? (
            <div>Searching...</div>
          ) : searchResults && searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {searchResults.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No books found matching "{searchQuery}"
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Featured Books</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {featuredBooks?.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Trending Books</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {trendingBooks?.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}