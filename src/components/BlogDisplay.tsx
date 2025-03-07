
import React, { useState, useEffect } from 'react';
import { PageData } from '@/utils/api';
import { parseMarkdown, sanitizeHtml } from '@/utils/markdownParser';

interface BlogDisplayProps {
  pageData: PageData;
}

const BlogDisplay: React.FC<BlogDisplayProps> = ({ pageData }) => {
  const [parsedContent, setParsedContent] = useState<string>('');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (pageData && pageData.markdown) {
      // Parse the markdown to HTML
      const htmlContent = parseMarkdown(pageData.markdown);
      // Sanitize the HTML for security
      const sanitizedHtml = sanitizeHtml(htmlContent);
      setParsedContent(sanitizedHtml);
    }
  }, [pageData]);

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden animate-fade-in">
      <div className="px-6 py-8 md:px-10 md:py-12">
        {pageData && (
          <>
            <div 
              className="blog-content prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
            
            {pageData.images && pageData.images.length > 0 && (
              <div className="mt-8 space-y-6">
                {pageData.images.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.image_base64}
                      alt={`Image from document page ${pageData.index + 1}`}
                      className={`lazy-image rounded-lg shadow-md w-full ${loadedImages[image.id] ? 'loaded' : ''}`}
                      onLoad={() => handleImageLoad(image.id)}
                    />
                    <div className="text-xs text-gray-500 mt-1 text-center">
                      Figure from page {pageData.index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogDisplay;
