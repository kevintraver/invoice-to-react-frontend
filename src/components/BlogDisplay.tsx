import React, { useState, useEffect } from 'react';
import { PageData } from '@/utils/api';
import { parseMarkdown, sanitizeHtml } from '@/utils/markdownParser';
import { Leaf, CloudSun, Moon } from 'lucide-react';

interface BlogDisplayProps {
  pageData: PageData;
}

const BlogDisplay: React.FC<BlogDisplayProps> = ({ pageData }) => {
  const [parsedContent, setParsedContent] = useState<string>('');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  useEffect(() => {
    if (pageData && pageData.markdown) {
      // Parse the markdown to HTML
      const htmlContent = parseMarkdown(pageData.markdown);
      // Sanitize the HTML for security
      const sanitizedHtml = sanitizeHtml(htmlContent);
      setParsedContent(sanitizedHtml);
    }
  }, [pageData]);

  useEffect(() => {
    // Apply custom styling to dark mode headers
    if (isDark) {
      const applyDarkModeHeaders = () => {
        const headers = document.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4, .blog-content h5, .blog-content h6');
        headers.forEach(header => {
          // Apply gradient text for headings in dark mode
          header.classList.add('dark-mode-heading');
        });
      };
      
      // Apply after render
      setTimeout(applyDarkModeHeaders, 100);
    }
  }, [isDark, parsedContent]);

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className={`
      w-full max-w-3xl mx-auto overflow-hidden animate-fade-in relative
      ${isDark 
        ? 'bg-slate-800/90 border border-indigo-500/20 shadow-lg shadow-indigo-900/10' 
        : 'ghibli-paper'
      }
      rounded-2xl
    `}>
      {/* Decorative elements */}
      <div className="absolute top-3 left-3 opacity-10 z-0">
        {isDark ? 
          <Moon className="h-8 w-8 text-indigo-300" /> :
          <Leaf className="h-8 w-8 text-ghibli-forest" />
        }
      </div>
      <div className="absolute bottom-3 right-3 opacity-10 z-0">
        {isDark ? 
          <Leaf className="h-10 w-10 text-indigo-300" /> :
          <CloudSun className="h-10 w-10 text-ghibli-forest" />
        }
      </div>
      
      <div className="px-6 py-8 md:px-10 md:py-12 relative z-10">
        {pageData && (
          <>
            <div 
              className="blog-content prose prose-slate dark:prose-invert max-w-none font-ghibli"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
            
            {pageData.images && pageData.images.length > 0 && (
              <div className="mt-8 space-y-6">
                {pageData.images.map((image) => (
                  <div 
                    key={image.id} 
                    className={`
                      relative rounded-lg 
                      ${isDark 
                        ? 'border-2 border-indigo-600/30 p-1 bg-slate-700/50' 
                        : 'hand-drawn-border'
                      }
                    `}
                  >
                    <img
                      src={image.image_base64}
                      alt={`Image from document page ${pageData.index + 1}`}
                      className={`
                        lazy-image rounded-lg w-full
                        ${isDark ? 'shadow-md shadow-indigo-900/20' : 'shadow-ghibli'}
                        ${loadedImages[image.id] ? 'loaded' : ''}
                      `}
                      onLoad={() => handleImageLoad(image.id)}
                    />
                    <div className={`
                      text-xs mt-2 text-center font-ghibli-handwritten
                      ${isDark ? 'text-indigo-200' : 'text-ghibli-forest/70'}
                    `}>
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
