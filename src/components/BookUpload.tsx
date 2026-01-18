import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { uploadBook } from '@/lib/api';
import { Upload, FileText, User, Hash, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface BookUploadProps {
  onSuccess?: () => void;
}

export function BookUpload({ onSuccess }: BookUploadProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [topN, setTopN] = useState(10);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFile = acceptedFiles.find(f => f.type === 'application/pdf');
    if (pdfFile) {
      setFile(pdfFile);
      setError(null);
    } else {
      setError('Please upload a PDF file');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !title.trim() || !author.trim()) {
      setError('Please fill in all required fields and upload a PDF');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title.trim());
      formData.append('author', author.trim());
      formData.append('topN', topN.toString());

      const result = await uploadBook(formData);
      
      setSuccess(`✅ "${result.book.title}" uploaded successfully! ML embedding in progress...`);
      setTitle('');
      setAuthor('');
      setTopN(10);
      setFile(null);
      
      onSuccess?.();
      
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = file && title.trim() && author.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Success Message */}
      {success && (
        <div className="p-5 rounded-2xl bg-success/10 border-2 border-success/30 text-center animate-fade-in">
          <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
          <p className="text-success font-medium">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-5 rounded-2xl bg-destructive/10 border-2 border-destructive/30 text-center animate-fade-in">
          <XCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
          <p className="text-destructive font-medium">{error}</p>
        </div>
      )}

      {/* Book Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-base font-semibold flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Book Title *
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-5 py-4 text-lg rounded-xl border-2 focus:border-primary"
          required
        />
      </div>

      {/* Author */}
      <div className="space-y-2">
        <Label htmlFor="author" className="text-base font-semibold flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Author *
        </Label>
        <Input
          id="author"
          type="text"
          placeholder="Enter author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="px-5 py-4 text-lg rounded-xl border-2 focus:border-primary"
          required
        />
      </div>

      {/* Top N Keywords */}
      <div className="space-y-4">
        <Label className="text-base font-semibold flex items-center gap-2">
          <Hash className="w-5 h-5 text-primary" />
          Top Keywords: {topN}
        </Label>
        <Slider
          value={[topN]}
          onValueChange={(value) => setTopN(value[0])}
          min={1}
          max={50}
          step={1}
          className="py-4"
        />
        <p className="text-sm text-muted-foreground">
          Number of top keywords to extract from the document (1-50)
        </p>
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label className="text-base font-semibold flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          PDF File *
        </Label>
        <div
          {...getRootProps()}
          className={`
            p-12 border-3 border-dashed rounded-2xl text-center cursor-pointer
            transition-all duration-300
            ${isDragActive 
              ? 'border-primary bg-primary/5 scale-[1.02]' 
              : 'border-border hover:border-primary/50 hover:bg-secondary/50'
            }
            ${file ? 'border-success bg-success/5' : ''}
          `}
        >
          <input {...getInputProps()} />
          <div className={`text-6xl mb-4 ${!file ? 'animate-bounce' : ''}`}>
            {file ? '✅' : '📄'}
          </div>
          {file ? (
            <div>
              <p className="text-lg font-semibold text-success mb-1">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xl font-semibold mb-2">
                {isDragActive ? 'Drop your PDF here!' : 'Drag and drop your PDF here'}
              </p>
              <p className="text-muted-foreground mb-4">or</p>
              <Button type="button" variant="outline" size="lg">
                Choose PDF File
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="success"
        size="xl"
        className="w-full"
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Uploading & Analyzing...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            Upload Book & Analyze
          </>
        )}
      </Button>
    </form>
  );
}
