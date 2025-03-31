import React from 'react';
import { Wind, CloudSun, Cloud } from 'lucide-react';

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  message = 'Processing your PDF...' 
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16">
      <div className="relative w-32 h-32">
        {/* Animated clouds */}
        <div className="absolute inset-0 flex items-center justify-center animate-float">
          <Cloud className="h-16 w-16 text-ghibli-cream dark:text-gray-300 opacity-90" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center animate-float-delayed">
          <CloudSun className="h-20 w-20 text-ghibli-sky dark:text-indigo-300 opacity-80" />
        </div>
        
        {/* Dust particles */}
        <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-ghibli-forest/30 dark:bg-gray-300/30 animate-dust" />
        <div className="absolute top-3/4 left-1/2 h-1 w-1 rounded-full bg-ghibli-forest/30 dark:bg-gray-300/30 animate-dust-delayed" />
        <div className="absolute top-1/2 left-3/4 h-2 w-2 rounded-full bg-ghibli-forest/30 dark:bg-gray-300/30 animate-dust-fast" />
        
        {/* Wind animation */}
        <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
          <Wind className="h-12 w-12 text-ghibli-forest/50 dark:text-indigo-300/50" />
        </div>
      </div>
      
      <div className="mt-8 text-ghibli-forest dark:text-gray-200 text-center">
        <p className="text-lg font-ghibli-display">{message}</p>
        <p className="mt-2 text-sm font-ghibli-handwritten text-ghibli-forest/70 dark:text-gray-300/70">
          Weaving your document into a beautiful story...
        </p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
