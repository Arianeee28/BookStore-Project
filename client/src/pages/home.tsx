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
    queryKey: ["/api/books/search", searchQuery],
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
      <SearchBar onSearch={handleSearch} />

      {searchQuery ? (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Search Results</h2>
          {searchLoading ? (
            <div>Searching...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults?.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Featured Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredBooks?.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Trending Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
