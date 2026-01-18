import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { searchBooks, compareBooks } from '@/lib/api';
import type { Recommendation, ComparisonResult } from '@/lib/types';
import { Search, Scale, Loader2, Brain, Zap, Target, BookOpen, AlertCircle } from 'lucide-react';

export default function DiscoverPage() {
  // Semantic Search State
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Comparison State
  const [bookId1, setBookId1] = useState('');
  const [bookId2, setBookId2] = useState('');
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [compareLoading, setCompareLoading] = useState(false);
  const [compareError, setCompareError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearchLoading(true);
    setSearchError(null);

    try {
      const result = await searchBooks(query.trim());
      setRecommendations(result.recommendations);
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : 'Search failed');
      setRecommendations([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId1.trim() || !bookId2.trim()) return;

    setCompareLoading(true);
    setCompareError(null);

    try {
      const result = await compareBooks(bookId1.trim(), bookId2.trim());
      setComparison(result);
      console.log("Similarity search result:", result);
    } catch (err) {
      setCompareError(err instanceof Error ? err.message : 'Comparison failed');
      setComparison(null);
    } finally {
      setCompareLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score > 0.8) return 'text-success';
    if (score > 0.6) return 'text-primary';
    if (score > 0.4) return 'text-yellow-500';
    return 'text-muted-foreground';
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Discover</span> Similar Books
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Use AI-powered semantic search to find books by meaning, or compare
            any two books to see how similar they are.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Semantic Search */}
          <div className="bg-card rounded-3xl border border-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                <Search className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Semantic Search</h2>
                <p className="text-sm text-muted-foreground">Find books by meaning</p>
              </div>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <Label htmlFor="query" className="text-sm font-semibold">
                  What are you looking for?
                </Label>
                <Textarea
                  id="query"
                  placeholder="E.g., 'books about artificial intelligence', 'stories with adventure themes'..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  rows={4}
                  className="mt-2 resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Describe themes, topics, or concepts you're interested in
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!query.trim() || searchLoading}
              >
                {searchLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Search Books
                  </>
                )}
              </Button>
            </form>

            {/* Search Error */}
            {searchError && (
              <div className="mt-4 p-4 rounded-xl bg-destructive/10 border border-destructive/30">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-sm">{searchError}</p>
                </div>
              </div>
            )}

            {/* Search Results */}
            {recommendations.length > 0 && (
              <div className="mt-6 space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">
                  Found {recommendations.length} matches
                </h3>
                {recommendations.map((rec) => (
                  <div
                    key={rec.book_id}
                    className="p-4 rounded-xl bg-secondary/50 border border-border hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold truncate">{rec.title}</h4>
                        <p className="text-sm text-muted-foreground">{rec.author}</p>
                      </div>
                      <Badge className={`${getScoreColor(rec.similarity_score)} bg-transparent border`}>
                        {(rec.similarity_score * 100).toFixed(1)}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono mt-2 truncate">
                      ID: {rec.book_id}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {recommendations.length === 0 && query && !searchLoading && !searchError && (
              <div className="mt-6 text-center py-8 text-muted-foreground">
                <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>No results found. Try a different query.</p>
              </div>
            )}
          </div>

          {/* Book Comparison */}
          <div className="bg-card rounded-3xl border border-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                <Scale className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Book Comparison</h2>
                <p className="text-sm text-muted-foreground">Compare two books</p>
              </div>
            </div>

            <form onSubmit={handleCompare} className="space-y-4">
              <div>
                <Label htmlFor="bookId1" className="text-sm font-semibold">
                  Book ID 1
                </Label>
                <Input
                  id="bookId1"
                  placeholder="Enter first book ID"
                  value={bookId1}
                  onChange={(e) => setBookId1(e.target.value)}
                  className="mt-2 font-mono text-sm"
                />
              </div>

              <div>
                <Label htmlFor="bookId2" className="text-sm font-semibold">
                  Book ID 2
                </Label>
                <Input
                  id="bookId2"
                  placeholder="Enter second book ID"
                  value={bookId2}
                  onChange={(e) => setBookId2(e.target.value)}
                  className="mt-2 font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Book IDs can be found in the Library page
                </p>
              </div>

              <Button
                type="submit"
                variant="outline"
                className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                disabled={!bookId1.trim() || !bookId2.trim() || compareLoading}
              >
                {compareLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Comparing...
                  </>
                ) : (
                  <>
                    <Scale className="w-4 h-4" />
                    Compare Books
                  </>
                )}
              </Button>
            </form>

            {/* Comparison Error */}
            {compareError && (
              <div className="mt-4 p-4 rounded-xl bg-destructive/10 border border-destructive/30">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-sm">{compareError}</p>
                </div>
              </div>
            )}

            {/* Comparison Result */}
            {comparison && (
              <div className="mt-6 space-y-4">
                <div className="text-center p-6 rounded-2xl bg-secondary/50 border border-border">
                  <p className={`text-4xl font-bold ${getScoreColor(comparison.similarity_score)}`}>
                    {comparison.similarity_percentage}%
                  </p>
                  <p className="text-lg font-medium mt-1">{comparison.interpretation}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">
                    Raw score: {comparison.similarity_score.toFixed(4)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                    <p className="text-xs text-muted-foreground mb-1">📖 Book 1</p>
                    <p className="font-semibold text-sm truncate">{comparison.book1.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{comparison.book1.author}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {comparison.book1.totalWords.toLocaleString()} words
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                    <p className="text-xs text-muted-foreground mb-1">📚 Book 2</p>
                    <p className="font-semibold text-sm truncate">{comparison.book2.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{comparison.book2.author}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {comparison.book2.totalWords.toLocaleString()} words
                    </p>
                  </div>
                </div>

                {/* Score Interpretation Guide */}
                <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">📊 Score Guide</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-success"></div>
                      <span>&gt;80% Very Similar</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>60-80% Similar</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span>40-60% Somewhat</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                      <span>&lt;40% Different</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-6 border border-border text-center card-hover">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Vector Embeddings</h3>
              <p className="text-sm text-muted-foreground">
                384-dimensional vectors capture the semantic meaning of each book's content.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border text-center card-hover">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">FAISS Search</h3>
              <p className="text-sm text-muted-foreground">
                Facebook's FAISS library enables lightning-fast similarity search at scale.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border text-center card-hover">
              <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-success" />
              </div>
              <h3 className="font-semibold mb-2">Cosine Similarity</h3>
              <p className="text-sm text-muted-foreground">
                Measures semantic distance between vectors for accurate matching.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
