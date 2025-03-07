
import React, { useState } from 'react';
import { FileDropzone } from '@/components';
import { processPdf, ApiResponse, PageData } from '@/utils/api';
import { BlogDisplay } from '@/components';
import { ShareWidget } from '@/components';
import { Button } from '@/components/ui/button';
import { Info, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [currentPage, setCurrentPage] = useState<PageData | null>(null);

  const handleFileAccepted = async (file: File) => {
    try {
      setIsProcessing(true);
      setApiResponse(null);
      setCurrentPage(null);
      
      toast.info('Processing your PDF...', {
        description: 'This may take a few moments depending on the file size.',
      });
      
      // Process the PDF file (mock API call)
      const response = await processPdf(file);
      
      // Update state with the API response
      setApiResponse(response);
      
      // Set the current page to the first page
      if (response.pages && response.pages.length > 0) {
        setCurrentPage(response.pages[0]);
        toast.success('PDF processed successfully!');
      } else {
        toast.error('No content found in the PDF.');
      }
    } catch (error) {
      console.error('Error processing PDF:', error);
      toast.error('Error processing PDF', {
        description: 'Please try again with a different file.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setApiResponse(null);
    setCurrentPage(null);
  };

  // Get title from markdown if available
  const getTitle = () => {
    if (!currentPage || !currentPage.markdown) return 'My Blog Post';
    
    // Try to extract the first heading from the markdown
    const titleMatch = currentPage.markdown.match(/^#\s+(.+)$/m);
    return titleMatch ? titleMatch[1].trim() : 'My Blog Post';
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blog-purple to-blog-purple/80 text-white py-6 md:py-12 mb-10 shadow-lg">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in">
            PDF to Blog Post Generator
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Transform your PDF documents into beautiful, shareable blog posts in seconds
          </p>
        </div>
      </header>

      <div className="container px-4 mx-auto">
        {/* Disclaimer */}
        <div className="w-full max-w-2xl mx-auto mb-8 p-4 bg-blog-light-orange/50 rounded-lg border border-blog-orange/20 flex items-start gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Info className="h-5 w-5 text-blog-orange shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong className="font-medium text-blog-orange">Important:</strong> Please only upload PDFs that don't contain sensitive or confidential information. 
            Converted blog posts may be publicly accessible.
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-10">
          {/* File Upload Section (show only if no blog post yet) */}
          {!currentPage && (
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <FileDropzone 
                onFileAccepted={handleFileAccepted} 
                isProcessing={isProcessing} 
              />
            </div>
          )}

          {/* Blog Display Section */}
          {currentPage && (
            <div className="space-y-6 animate-slide-up">
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetForm}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Convert Another PDF
                </Button>
              </div>
              
              <BlogDisplay pageData={currentPage} />
              
              <ShareWidget title={getTitle()} />
              
              {/* Usage info */}
              {apiResponse && apiResponse.usage_info && (
                <div className="w-full max-w-2xl mx-auto mt-4 text-xs text-center text-muted-foreground">
                  <p>
                    Processed {apiResponse.usage_info.pages_processed} page{apiResponse.usage_info.pages_processed !== 1 ? 's' : ''} •
                    {' '}{(apiResponse.usage_info.doc_size_bytes / 1024 / 1024).toFixed(2)} MB •
                    {' '}Model: {apiResponse.model}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-6 bg-secondary/80">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} PDF to Blog Post Generator • Powered by Mastra + Mistral OCR</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
