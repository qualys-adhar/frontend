import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookDetails } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ArrowLeft,
    Loader2,
    BookOpen,
    User,
    FileText,
    Brain,
    TrendingUp,
    AlertCircle
} from 'lucide-react';

export default function BookDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingSimilar, setLoadingSimilar] = useState(false);

    const loadBookDetails = async (page: number) => {
        if (!id) return;

        try {
            setLoadingSimilar(page !== 1);
            const result = await fetchBookDetails(id, page, 10);
            setData(result);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load book details');
        } finally {
            setLoading(false);
            setLoadingSimilar(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        loadBookDetails(1);
    }, [id]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        loadBookDetails(newPage);
    };

    const getScoreColor = (score: number) => {
        if (score > 0.8) return 'text-success';
        if (score > 0.6) return 'text-primary';
        if (score > 0.4) return 'text-yellow-500';
        return 'text-muted-foreground';
    };

    const getScoreBg = (score: number) => {
        if (score > 0.8) return 'bg-success/10 border-success/30';
        if (score > 0.6) return 'bg-primary/10 border-primary/30';
        if (score > 0.4) return 'bg-yellow-500/10 border-yellow-500/30';
        return 'bg-muted border-border';
    };

    if (loading) {
        return (
            <div className="min-h-screen py-12 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-muted-foreground">Loading book details...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/library')}
                        className="mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Library
                    </Button>
                    <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-8 text-center">
                        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-destructive mb-2">Error</h2>
                        <p className="text-muted-foreground">{error || 'Book not found'}</p>
                    </div>
                </div>
            </div>
        );
    }

    const { book, similarBooks, pagination } = data;

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => navigate('/library')}
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Library
                </Button>

                {/* Book Header */}
                <div className="bg-card rounded-3xl border border-border p-8 mb-8">
                    <div className="flex items-start gap-6">
                        <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center text-4xl shrink-0">
                            📚
                        </div>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                            <div className="flex items-center gap-4 text-muted-foreground mb-4">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{book.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    <span>{book.totalWords.toLocaleString()} words</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="font-mono">{book._id}</span>
                                {book.embedding && (
                                    <Badge variant="secondary" className="gap-1">
                                        <Brain className="w-3 h-3" />
                                        Embedded
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Keywords & Stats */}
                    <div className="space-y-6">
                        {/* Top Keywords */}
                        <div className="bg-card rounded-2xl border border-border p-6">
                            <h2 className="font-semibold text-lg mb-4">Top Keywords</h2>
                            <div className="space-y-2">
                                {book.topWords && book.topWords.length > 0 ? (
                                    book.topWords.slice(0, 10).map((kw: any, idx: number) => (
                                        <div key={idx} className="flex items-center justify-between">
                                            <span className="text-sm">{kw.word}</span>
                                            <Badge variant="secondary">{kw.count}</Badge>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No keywords available</p>
                                )}
                            </div>
                        </div>

                        {/* Embedding Info */}
                        {book.embedding && (
                            <div className="bg-card rounded-2xl border border-border p-6">
                                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <Brain className="w-5 h-5" />
                                    AI Embedding
                                </h2>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Dimensions:</span>
                                        <span className="font-mono">384</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Model:</span>
                                        <span className="text-xs">all-MiniLM-L6-v2</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Status:</span>
                                        <Badge variant="default" className="text-xs">Ready</Badge>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Similar Books */}
                    <div className="lg:col-span-2">
                        <div className="bg-card rounded-2xl border border-border p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-semibold text-xl flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" />
                                    Similar Books
                                </h2>
                                <Badge variant="secondary">
                                    {pagination.total} results
                                </Badge>
                            </div>

                            {data.message && (
                                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                                    <p className="text-sm text-yellow-700 dark:text-yellow-400">{data.message}</p>
                                </div>
                            )}

                            {loadingSimilar ? (
                                <div className="text-center py-12">
                                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                                </div>
                            ) : similarBooks.length > 0 ? (
                                <div className="space-y-3">
                                    {similarBooks.map((similar: any, idx: number) => (
                                        <div
                                            key={similar.book_id}
                                            className={`p-4 rounded-xl border-2 transition-all hover:shadow-md cursor-pointer ${getScoreBg(similar.similarity_score)}`}
                                            onClick={() => navigate(`/books/${similar.book_id}`)}
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-sm font-semibold text-muted-foreground">
                                                            #{(currentPage - 1) * 10 + idx + 1}
                                                        </span>
                                                        <h3 className="font-bold truncate">{similar.title}</h3>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mb-2">{similar.author}</p>
                                                    <div className="flex flex-wrap gap-1 mb-2">
                                                        {similar.topWords.map((kw: any, i: number) => (
                                                            <Badge key={i} variant="outline" className="text-xs">
                                                                {kw.word}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        {similar.totalWords.toLocaleString()} words
                                                    </p>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <div className={`text-2xl font-bold ${getScoreColor(similar.similarity_score)}`}>
                                                        {(similar.similarity_score * 100).toFixed(1)}%
                                                    </div>
                                                    <div className="text-xs text-muted-foreground mt-1">
                                                        {similar.interpretation}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                                    <p className="text-muted-foreground">No similar books found</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-border">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1 || loadingSimilar}
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
                                                        onClick={() => handlePageChange(page)}
                                                        disabled={loadingSimilar}
                                                    >
                                                        {page}
                                                    </Button>
                                                </div>
                                            ))}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === pagination.totalPages || loadingSimilar}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
