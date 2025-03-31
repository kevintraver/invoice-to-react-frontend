import React, { useEffect, useState } from 'react';
import { FileText, ArrowRight, BookOpen } from 'lucide-react';

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  message = 'Processing your PDF...' 
}) => {
  const [dots, setDots] = useState('');

  // Animated dots effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 400);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center py-10">
      {/* Simple PDF processing animation */}
      <div className="relative w-64 h-24 flex items-center justify-between mb-6">
        {/* PDF document */}
        <div className="relative transform transition-all animate-pulse-slow">
          <div className="relative bg-white dark:bg-gray-700 w-16 h-20 rounded-md shadow-md border border-ghibli-cream/20 dark:border-gray-600 flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-ghibli-accent dark:bg-indigo-600 opacity-20"></div>
            <FileText className="h-8 w-8 text-ghibli-forest dark:text-gray-300 opacity-70" />
          </div>
          {/* PDF lines */}
          <div className="absolute -right-6 top-4 w-6 h-2 bg-ghibli-forest/20 dark:bg-gray-400/30 rounded-full"></div>
          <div className="absolute -right-8 top-8 w-8 h-2 bg-ghibli-forest/20 dark:bg-gray-400/30 rounded-full"></div>
          <div className="absolute -right-4 top-12 w-4 h-2 bg-ghibli-forest/20 dark:bg-gray-400/30 rounded-full"></div>
        </div>

        {/* Arrow processing */}
        <div className="px-4 flex justify-center">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <ArrowRight 
                key={`arrow-${i}`}
                className="h-6 w-6 text-ghibli-accent dark:text-indigo-400"
                style={{ 
                  opacity: dots.length > i ? 1 : 0.3,
                  transition: 'opacity 0.2s ease-in-out'
                }}
              />
            ))}
          </div>
        </div>

        {/* Blog output */}
        <div className="relative transform transition-all animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
          <div className="bg-white dark:bg-gray-700 w-16 h-20 rounded-md shadow-md border border-ghibli-cream/20 dark:border-gray-600 flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-ghibli-forest dark:bg-indigo-600 opacity-20"></div>
            <BookOpen className="h-8 w-8 text-ghibli-forest dark:text-gray-300 opacity-70" />
          </div>
          {/* Lines of text */}
          <div className="absolute -left-10 top-4 w-10 h-1.5 bg-ghibli-forest/20 dark:bg-gray-400/30 rounded-full"></div>
          <div className="absolute -left-8 top-8 w-8 h-1.5 bg-ghibli-forest/20 dark:bg-gray-400/30 rounded-full"></div>
          <div className="absolute -left-6 top-12 w-6 h-1.5 bg-ghibli-forest/20 dark:bg-gray-400/30 rounded-full"></div>
          <div className="absolute -left-9 top-16 w-9 h-1.5 bg-ghibli-forest/20 dark:bg-gray-400/30 rounded-full"></div>
        </div>
      </div>
      
      {/* Progress bar to show processing */}
      <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
        <div className="h-full bg-gradient-to-r from-ghibli-forest to-ghibli-accent dark:from-indigo-700 dark:to-indigo-500 rounded-full animate-pulse-slow origin-left" style={{
          width: '70%',
          animation: 'pulse-slow 2s ease-in-out infinite alternate'
        }}></div>
      </div>
      
      {/* Message */}
      <div className="text-center">
        <p className="text-lg font-ghibli-display text-ghibli-forest dark:text-gray-200">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
