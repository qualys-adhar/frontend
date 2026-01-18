export interface Book {
  _id: string;
  title: string;
  author: string;
  topWords: Array<{ word: string; count: number }>;
  totalWords: number;
  s3Key?: string;
  uploadedAt: string;
  embedding?: number[];
  embeddedAt?: string;
}

export interface Recommendation {
  book_id: string;
  title: string;
  author: string;
  similarity_score: number;
  metadata: {
    topWords: Array<{ word: string; count: number }>;
    totalWords: number;
  };
}

export interface ComparisonResult {
  success: boolean;
  book1: {
    id: string;
    title: string;
    author: string;
    totalWords: number;
  };
  book2: {
    id: string;
    title: string;
    author: string;
    totalWords: number;
  };
  similarity_score: number;
  similarity_percentage: string;
  interpretation: string;
}

export interface MLStats {
  total_books: number;
  indexed_books: number;
  with_embeddings: number;
  embedding_dim: number;
  model: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
