import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BooksList } from '@/components/BooksList';
import { Button } from '@/components/ui/button';
import { RefreshCw, Plus, Search, BarChart3 } from 'lucide-react';

export default function LibraryPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshKey((k) => k + 1);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">
              Your <span className="gradient-text">Library</span>
            </h1>
            <p className="text-muted-foreground">
              Browse all uploaded books with AI-powered analysis
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Link to="/upload">
              <Button>
                <Plus className="w-4 h-4" />
                Add Book
              </Button>
            </Link>
          </div>
        </div>

        {/* Books List */}
        <BooksList refreshKey={refreshKey} />

        {/* Info Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                <Search className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Semantic Search</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Each book is converted into a 384-dimensional vector using the all-MiniLM-L6-v2 
                  model. This enables searching by meaning rather than exact keyword matches.
                </p>
                <Link to="/discover">
                  <Button variant="outline" size="sm">
                    Try Semantic Search
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Content Analysis</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  AI extracts top keywords and word counts from each document. This helps 
                  understand the book's content at a glance without reading it.
                </p>
                <Link to="/upload">
                  <Button variant="outline" size="sm">
                    Analyze a Book
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
