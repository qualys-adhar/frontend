import { BookUpload } from '@/components/BookUpload';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Database, FileText } from 'lucide-react';

const steps = [
  { icon: FileText, label: 'Upload PDF', desc: 'Drop or select your book' },
  { icon: Zap, label: 'AI Analysis', desc: 'Content extraction & keywords' },
  { icon: Database, label: 'Embedding', desc: '384-D vector generation' },
  { icon: Shield, label: 'Indexed', desc: 'Ready for semantic search' },
];

const features = [
  {
    icon: Shield,
    title: 'Secure Storage',
    description: 'Your files are encrypted and stored safely in the cloud.',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    description: 'AI analysis completes in seconds, not minutes.',
  },
  {
    icon: Database,
    title: 'Smart Indexing',
    description: 'Automatic vector embedding for intelligent search.',
  },
];

export default function UploadPage() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    setTimeout(() => {
      navigate('/library');
    }, 2000);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Upload Your <span className="gradient-text">Book</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Drop your PDF and let AI analyze the content, extract keywords, and create 
            semantic embeddings for intelligent discovery.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {steps.map((step, idx) => (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden sm:block w-12 h-0.5 bg-border mx-4 mt-[-1.5rem]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upload Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-card rounded-3xl border border-border p-8 shadow-xl">
            <BookUpload onSuccess={handleSuccess} />
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="bg-card rounded-2xl p-6 border border-border text-center card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
