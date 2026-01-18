import { useState, useEffect } from 'react';
import { BookCard } from './BookCard';
import { fetchBooks, fetchMLStats } from '@/lib/api';
import type { Book, MLStats } from '@/lib/types';
import { Loader2, BookOpen, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

interface BooksListProps {
  refreshKey?: number;
}

export function BooksList({ refreshKey = 0 }: BooksListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [stats, setStats] = useState<MLStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });
  const booksPerPage = 12;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [booksData, statsData] = await Promise.all([
          fetchBooks(currentPage, booksPerPage),
          fetchMLStats().catch(() => null),
        ]);

        setBooks(booksData.books);
        setPagination({
          total: booksData.pagination.total,
          totalPages: booksData.pagination.totalPages,
        });
        setStats(statsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load books');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [refreshKey, currentPage]);

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground text-lg">Loading your library...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <p className="text-destructive font-medium mb-2">Failed to load books</p>
        <p className="text-muted-foreground text-sm">{error}</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No books yet</h3>
        <p className="text-muted-foreground">
          Upload your first PDF to get started with AI-powered book discovery.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ML Stats */}
      {stats && (
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            ML Indexing Status
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-secondary rounded-xl">
              <p className="text-2xl font-bold text-primary">{stats.total_books}</p>
              <p className="text-sm text-muted-foreground">Total Books</p>
            </div>
            <div className="text-center p-4 bg-secondary rounded-xl">
              <p className="text-2xl font-bold text-primary">{stats.indexed_books}</p>
              <p className="text-sm text-muted-foreground">Indexed</p>
            </div>
            <div className="text-center p-4 bg-secondary rounded-xl">
              <p className="text-2xl font-bold text-success">{stats.with_embeddings}</p>
              <p className="text-sm text-muted-foreground">With Embeddings</p>
            </div>
            <div className="text-center p-4 bg-secondary rounded-xl">
              <p className="text-2xl font-bold text-accent">{stats.embedding_dim}</p>
              <p className="text-sm text-muted-foreground">Dimensions</p>
            </div>
          </div>
        </div>
      )}

      {/* Books Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            Your Library ({pagination.total} books)
          </h2>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {pagination.totalPages}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1 || isLoading}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter(p => {
                  return p === 1 ||
                    p === pagination.totalPages ||
                    Math.abs(p - currentPage) <= 1;
                })
                .map((page, idx, arr) => (
                  <div key={page} className="flex items-center">
                    {idx > 0 && arr[idx - 1] !== page - 1 && (
                      <span className="px-2 text-muted-foreground">...</span>
                    )}
                    <Button
                      variant={page === currentPage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      disabled={isLoading}
                    >
                      {page}
                    </Button>
                  </div>
                ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === pagination.totalPages || isLoading}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
