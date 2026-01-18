# 📚 BookAI Explorer - Frontend

A modern React-based web application for intelligent book analysis, discovery, and similarity search powered by AI embeddings.

## 🌟 Features

### 📖 Book Management

- **Upload & Analyze**: Upload PDF books and extract text with automatic word frequency analysis
- **Library View**: Browse your entire book collection with smart pagination (12 books per page)
- **Book Details**: View comprehensive information including title, author, keywords, word count, and AI embeddings
- **PDF Download**: Secure S3-signed URLs for downloading original PDFs

### 🤖 AI-Powered Similarity

- **Auto-Similarity**: Automatically compute similarity scores against all books in your library
- **Smart Sorting**: Books ranked by relevance using 384-dimensional embeddings
- **Visual Scoring**: Color-coded similarity indicators
  - 🟢 Green (>80%): Very similar
  - 🔵 Blue (>60%): Similar
  - 🟡 Yellow (>40%): Somewhat similar
  - ⚪ Gray (≤40%): Different

### 🔍 Discovery & Comparison

- **Book Comparison**: Compare any two books directly and see their similarity score
- **Keyword Analysis**: View top 10 most frequent words per book
- **Genre Classification**: Optional genre metadata for better organization
- **Interactive Navigation**: Click any book card to explore its details and similar books

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) for blazing-fast development
- **Runtime**: [Bun](https://bun.sh/) for ultra-fast package management
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design system
- **State Management**: [TanStack Query](https://tanstack.com/query) for server state
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📁 Project Structure

```
bookai-explorer/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx        # Main app layout with header/footer
│   │   │   └── Header.tsx        # Navigation header
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── BookCard.tsx          # Book card with click navigation
│   │   ├── BooksList.tsx         # Paginated book grid
│   │   └── ...
│   ├── pages/
│   │   ├── Index.tsx             # Landing page
│   │   ├── UploadPage.tsx        # PDF upload & analysis
│   │   ├── LibraryPage.tsx       # Book collection view
│   │   ├── BookDetailPage.tsx    # Book details + similarity
│   │   ├── DiscoverPage.tsx      # Book comparison tool
│   │   └── NotFound.tsx          # 404 page
│   ├── lib/
│   │   ├── api.ts                # Backend API client
│   │   ├── types.ts              # TypeScript interfaces
│   │   └── utils.ts              # Utility functions
│   ├── App.tsx                   # Root component with routing
│   └── main.tsx                  # Application entry point
├── public/                       # Static assets
├── index.html                    # HTML template
├── vite.config.ts                # Vite configuration
├── tailwind.config.ts            # Tailwind CSS config
└── package.json                  # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- **Bun**: Install from [bun.sh](https://bun.sh/)
- **Node.js**: v20+ (if not using Bun)
- **Backend API**: Running on `http://localhost:3001`
- **ML Service**: Running on `http://localhost:8000`

### Installation

```bash
# Clone the repository
cd bookai-explorer

# Install dependencies
bun install
# or
npm install
```

### Configuration

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001
```

### Development

```bash
# Start development server
bun run dev
# or
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Production build
bun run build
# or
npm run build

# Preview production build
bun run preview
# or
npm run preview
```

## 🔌 API Integration

### Backend Endpoints

| Endpoint              | Method | Description                |
| --------------------- | ------ | -------------------------- |
| `/books`              | GET    | List books with pagination |
| `/books/:id`          | GET    | Get single book details    |
| `/books/:id/details`  | GET    | Get book + auto-similarity |
| `/books/:id/download` | GET    | Get S3 download URL        |
| `/books/similarity`   | POST   | Compare two books          |
| `/analyze`            | POST   | Upload and analyze PDF     |
| `/ml/stats`           | GET    | Get ML service statistics  |

### API Client

The frontend uses a centralized API client (`src/lib/api.ts`) with typed responses:

```typescript
import { fetchBooks, fetchBookDetails, compareBooks } from "@/lib/api";

// Fetch paginated books
const { books, pagination } = await fetchBooks(page, limit);

// Get book details with similarity
const { book, similarBooks } = await fetchBookDetails(bookId, page);

// Compare two books
const result = await compareBooks(bookId1, bookId2);
```

## 🎨 UI Components

### shadcn/ui Components Used

- **Button**: Primary actions and navigation
- **Badge**: Tags and labels (keywords, counts)
- **Card**: Content containers
- **Dialog**: Modals and confirmations
- **Input**: Form fields
- **Progress**: Upload and analysis progress
- **Toast/Sonner**: Notifications
- **Tooltip**: Helper text
- **Separator**: Visual dividers

### Custom Components

- **BookCard**: Clickable book card with navigation
- **BooksList**: Paginated grid with ML stats
- **Layout**: Responsive layout with navigation
- **Header**: App navigation bar

## 📱 Pages

### 1. Landing Page (`/`)

- Hero section with app introduction
- Feature highlights
- Call-to-action buttons

### 2. Upload Page (`/upload`)

- Drag-and-drop PDF upload
- Book metadata input (title, author)
- Real-time analysis progress
- Automatic ML embedding

### 3. Library Page (`/library`)

- Paginated book grid (12 per page)
- ML indexing statistics
- Total books counter
- Click cards to view details

### 4. Book Detail Page (`/books/:id`)

- Book information (title, author, keywords)
- AI embedding metadata (384 dimensions)
- Similar books grid (sorted by relevance)
- Paginated similar books (10 per page)
- Click similar books to navigate

### 5. Discover Page (`/discover`)

- Compare two books side-by-side
- Similarity score with interpretation
- Book ID input fields
- Visual comparison results

## 🎯 Key Features Explained

### Auto-Similarity Computation

When you open a book detail page:

1. Backend fetches the book and all other books with embeddings
2. Computes cosine similarity using ML service for each book pair
3. Sorts results by similarity score (descending)
4. Returns paginated results
5. Frontend displays color-coded similarity cards

### Pagination

- **Library**: 12 books per page with smart page numbers
- **Similar Books**: 10 books per page with full pagination
- Smart ellipsis for large page counts (shows first, last, current ± 1)

### Navigation Flow

```
Library → Click Book Card → Book Details → Click Similar Book → Navigate to that Book
```

## 🧪 Testing

```bash
# Run tests
bun test
# or
npm test

# Watch mode
bun test:watch
# or
npm run test:watch
```

## 🎨 Customization

### Theme

Edit `src/index.css` to customize the color scheme:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
  --accent: 210 40% 96.1%;
  /* ... */
}
```

### Tailwind Config

Modify `tailwind.config.ts` for custom breakpoints, spacing, etc.

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Backend Connection Issues

- Verify backend is running on `http://localhost:3001`
- Check CORS settings in backend
- Ensure `.env` file has correct `VITE_API_URL`

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules bun.lockb
bun install
```

## 📝 Environment Variables

| Variable       | Default                 | Description     |
| -------------- | ----------------------- | --------------- |
| `VITE_API_URL` | `http://localhost:3001` | Backend API URL |

## 🚢 Deployment

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```bash
# Build image
docker build -t bookai-explorer .

# Run container
docker run -p 5173:5173 bookai-explorer
```

### Static Hosting

```bash
# Build
bun run build

# Deploy dist/ folder to:
# - Netlify
# - Vercel
# - GitHub Pages
# - AWS S3 + CloudFront
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vite](https://vitejs.dev/) for lightning-fast builds
- [React](https://react.dev/) for the component framework

---

**Built with ❤️ using React, TypeScript, and AI**
