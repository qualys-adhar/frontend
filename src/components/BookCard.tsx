import { Book } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, CheckCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const topKeywords = book.topWords?.slice(0, 5) || [];

  const handleCopyId = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    try {
      await navigator.clipboard.writeText(book._id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCardClick = () => {
    navigate(`/books/${book._id}`);
  };

  return (
    <div
      className="bg-card rounded-2xl border border-border p-6 card-hover cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center text-2xl shrink-0">
          📚
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-lg text-foreground truncate" title={book.title}>
            {book.title}
          </h3>
          <p className="text-muted-foreground text-sm truncate" title={book.author}>
            {book.author}
          </p>
        </div>
      </div>

      {/* Keywords */}
      {topKeywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {topKeywords.map((kw, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="text-xs font-medium"
            >
              {kw.word}: {kw.count}
            </Badge>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="w-4 h-4" />
          <span>{book.totalWords?.toLocaleString() || 0} words</span>
        </div>
        <div className="flex items-center gap-1 text-success text-sm">
          <CheckCircle className="w-4 h-4" />
          <span>Analyzed</span>
        </div>
      </div>

      {/* Book ID with Copy Button */}
      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground font-mono truncate flex-1" title={book._id}>
          ID: {book._id}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyId}
          className="h-7 px-2 shrink-0"
          title="Copy book ID"
        >
          {copied ? (
            <Check className="w-3 h-3 text-success" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </Button>
      </div>
    </div>
  );
}
