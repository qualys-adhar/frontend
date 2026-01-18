import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload, Search, BarChart3, BookOpen, Zap, Brain, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'Upload PDFs',
    description: 'Drop your PDF books and let AI analyze the content automatically.',
  },
  {
    icon: Search,
    title: 'Semantic Search',
    description: 'Find books by meaning, not just keywords. Describe what you want to read.',
  },
  {
    icon: BarChart3,
    title: 'Deep Analytics',
    description: 'Get keyword extraction, word counts, and content insights instantly.',
  },
];

const techStack = [
  { name: 'all-MiniLM-L6-v2', desc: 'Sentence transformer model' },
  { name: 'FAISS', desc: 'Vector similarity search' },
  { name: '384-D Embeddings', desc: 'Rich semantic representations' },
  { name: 'Cosine Similarity', desc: 'Accurate matching' },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Brain className="w-4 h-4" />
              Powered by AI & Vector Embeddings
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              Discover Books with{' '}
              <span className="gradient-text-animated">AI Intelligence</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in">
              Upload your PDFs, analyze content with AI, and find similar books using 
              state-of-the-art semantic search with 384-dimensional embeddings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/upload">
                <Button variant="hero" className="w-full sm:w-auto">
                  <Upload className="w-5 h-5" />
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/library">
                <Button variant="hero-outline" className="w-full sm:w-auto">
                  <BookOpen className="w-5 h-5" />
                  Browse Library
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three simple steps to unlock AI-powered book discovery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={feature.title}
                className="bg-card rounded-3xl p-8 border border-border card-hover"
              >
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="gradient-text">Cutting-Edge</span> Technology
              </h2>
              <p className="text-muted-foreground text-lg">
                Built with state-of-the-art ML models for accurate semantic understanding
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {techStack.map((tech) => (
                <div 
                  key={tech.name}
                  className="bg-card rounded-2xl p-6 border border-border text-center card-hover"
                >
                  <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-sm mb-1">{tech.name}</h4>
                  <p className="text-xs text-muted-foreground">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Discover Your Next Favorite Book?
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Start building your AI-powered book library today. Upload your first PDF and 
              experience the power of semantic search.
            </p>
            <Link to="/upload">
              <Button variant="hero">
                <Upload className="w-5 h-5" />
                Upload Your First Book
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
