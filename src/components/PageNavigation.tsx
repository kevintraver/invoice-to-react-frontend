import React from 'react';
import { ArrowLeft, ArrowRight, Bird } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  // Create page numbers array with ellipsis for large page counts
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 7) {
      // If there are 7 or fewer pages, show all
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(0);
      
      if (currentPage > 2) {
        pageNumbers.push(null); // ellipsis
      }
      
      // Add pages around current page
      const startPage = Math.max(1, currentPage - 1);
      const endPage = Math.min(totalPages - 2, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 3) {
        pageNumbers.push(null); // ellipsis
      }
      
      // Always include last page
      pageNumbers.push(totalPages - 1);
    }
    
    return pageNumbers;
  };

  return (
    <div className="w-full max-w-xl mx-auto my-8 flex flex-col items-center">
      <div className="flex items-center justify-center gap-2 md:gap-3">
        <Button
          className="ghibli-button-outline p-2"
          onClick={handlePrevious}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          <ArrowLeft className="h-4 w-4 text-ghibli-forest" />
        </Button>
        
        <div className="flex items-center gap-1 md:gap-2">
          {getPageNumbers().map((page, index) => (
            page === null ? (
              <span key={`ellipsis-${index}`} className="w-8 text-center text-ghibli-forest/60">
                ...
              </span>
            ) : (
              <button
                key={`page-${page}`}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                  currentPage === page 
                    ? 'bg-ghibli-forest text-ghibli-cream font-medium'
                    : 'hover:bg-ghibli-cream/50 text-ghibli-forest font-ghibli-handwritten'
                }`}
                onClick={() => onPageChange(page)}
                aria-label={`Go to page ${page + 1}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page + 1}
              </button>
            )
          ))}
        </div>
        
        <Button
          className="ghibli-button-outline p-2"
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          aria-label="Next page"
        >
          <ArrowRight className="h-4 w-4 text-ghibli-forest" />
        </Button>
      </div>
      
      <div className="mt-4 text-sm text-ghibli-forest/70 font-ghibli-handwritten flex items-center">
        <Bird className="h-4 w-4 mr-2 opacity-70" />
        Page {currentPage + 1} of {totalPages}
      </div>
    </div>
  );
};

export default PageNavigation;
