import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📚</span>
              <span className="text-lg font-bold gradient-text">BookAI</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              AI-powered book discovery using semantic search and 384-dimensional embeddings.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/upload" className="hover:text-primary transition-colors">PDF Analysis</Link></li>
              <li><Link to="/library" className="hover:text-primary transition-colors">Book Library</Link></li>
              <li><Link to="/discover" className="hover:text-primary transition-colors">Semantic Search</Link></li>
              <li><Link to="/discover" className="hover:text-primary transition-colors">Book Comparison</Link></li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="font-semibold mb-4">Technology</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>all-MiniLM-L6-v2</li>
              <li>FAISS Vector Search</li>
              <li>384-D Embeddings</li>
              <li>Cosine Similarity</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <BookOpen className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} BookAI. Built with ❤️ using AI.</p>
        </div>
      </div>
    </footer>
  );
}
