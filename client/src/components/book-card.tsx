import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { type Book } from "@shared/schema";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="overflow-hidden transition-transform hover:scale-105">
      <CardContent className="p-0">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-64 object-cover"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <h3 className="font-semibold text-lg">{book.title}</h3>
        <p className="text-gray-600">{book.author}</p>
        <p className="text-primary font-bold mt-2">
          ${(book.price / 100).toFixed(2)}
        </p>
      </CardFooter>
    </Card>
  );
}
