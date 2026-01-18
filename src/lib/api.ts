import type {
  Book,
  MLStats,
  Recommendation,
  ComparisonResult,
  PaginationInfo,
} from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function fetchBooks(
  page = 1,
  limit = 100,
): Promise<{
  books: Book[];
  pagination: PaginationInfo;
}> {
  const response = await fetch(`${API_URL}/books?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }
  return response.json();
}

export async function fetchMLStats(): Promise<MLStats> {
  const response = await fetch(`${API_URL}/ml/stats`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ML stats: ${response.status}`);
  }
  return response.json();
}

export async function uploadBook(formData: FormData): Promise<{
  success: boolean;
  book: Book;
}> {
  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`Failed to upload book: ${response.status}`);
  }
  return response.json();
}

export async function searchBooks(
  query: string,
  k = 5,
  threshold?: number,
): Promise<{
  recommendations: Recommendation[];
  query: string;
  count: number;
}> {
  const response = await fetch(`${API_URL}/ml/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query_text: query,
      k,
      threshold,
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to search books: ${response.status}`);
  }
  return response.json();
}

export async function compareBooks(
  bookId1: string,
  bookId2: string,
): Promise<ComparisonResult> {
  const response = await fetch(`${API_URL}/books/similarity`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      book_id_1: bookId1,
      book_id_2: bookId2,
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to compare books: ${response.status}`);
  }
  return response.json();
}
export async function fetchBookDetails(
  bookId: string,
  page = 1,
  limit = 10,
): Promise<{
  book: Book & { genre: string | null };
  similarBooks: Array<{
    book_id: string;
    title: string;
    author: string;
    totalWords: number;
    topWords: Array<{ word: string; count: number }>;
    similarity_score: number;
    interpretation: string;
  }>;
  pagination: PaginationInfo;
  message?: string;
}> {
  const response = await fetch(
    `${API_URL}/books/${bookId}/details?page=${page}&limit=${limit}`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch book details: ${response.status}`);
  }
  return response.json();
}
