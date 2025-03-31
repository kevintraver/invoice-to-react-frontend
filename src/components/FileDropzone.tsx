import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileType, Check, CloudSun, Wind, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface FileDropzoneProps {
  onFileAccepted: (file: File) => void;
  isProcessing: boolean;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileAccepted, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    // Check if the file is a PDF
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file', {
        style: { background: '#FFADAD', border: '1px solid #5D7B6F', color: '#5D7B6F' }
      });
      return false;
    }
    
    // Check file size (limit to 50MB)
    const MAX_SIZE = 50 * 1024 * 1024; // 50MB
    if (file.size > MAX_SIZE) {
      toast.error('File is too large. Please upload a file smaller than 50MB', {
        style: { background: '#FFADAD', border: '1px solid #5D7B6F', color: '#5D7B6F' }
      });
      return false;
    }
    
    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        onFileAccepted(droppedFile);
      }
    }
  }, [onFileAccepted]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        onFileAccepted(selectedFile);
      }
    }
  }, [onFileAccepted]);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-2xl mx-auto rounded-xl p-12 transition-all duration-300 ease-in-out border-2 border-dashed hand-drawn-border",
        isDragging 
          ? "border-ghibli-forest dark:border-indigo-400 bg-ghibli-tea/50 dark:bg-indigo-900/30 dropzone-active" 
          : "border-ghibli-forest/30 dark:border-indigo-500/40 bg-white/70 dark:bg-gray-800/70",
        isProcessing 
          ? "pointer-events-none opacity-80" 
          : "hover:bg-ghibli-tea/30 dark:hover:bg-indigo-900/20 cursor-pointer",
        file && !isProcessing 
          ? "bg-ghibli-tea/20 dark:bg-indigo-900/30 border-ghibli-forest/60 dark:border-indigo-400/60" 
          : ""
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileInput}
        accept=".pdf"
        className="hidden"
        disabled={isProcessing}
      />
      
      <div className="flex flex-col items-center justify-center text-center">
        {isProcessing ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative h-16 w-16 animate-pulse-soft">
              <Wind className="h-16 w-16 text-ghibli-forest dark:text-indigo-300 opacity-70 animate-sway" />
            </div>
            <div className="text-lg font-medium text-ghibli-forest dark:text-gray-200 font-ghibli-handwritten">
              Processing your PDF...
            </div>
            <div className="loading-dots mt-2">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : file ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative h-16 w-16">
              <FileType className="h-16 w-16 text-ghibli-forest dark:text-indigo-300" />
              <div className="absolute -right-1 -bottom-1 bg-ghibli-moss dark:bg-indigo-500 rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <p className="text-lg font-medium font-ghibli dark:text-gray-200">{file.name}</p>
              <p className="text-sm text-ghibli-forest/70 dark:text-indigo-200/70 font-ghibli-handwritten">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="h-20 w-20 rounded-full bg-ghibli-tea/70 dark:bg-indigo-800/50 p-5 animate-gentle-bounce">
              {isDark ? (
                <Moon className="h-10 w-10 text-indigo-200" />
              ) : (
                <CloudSun className="h-10 w-10 text-ghibli-forest" />
              )}
            </div>
            <div>
              <p className="text-xl font-medium font-ghibli-display text-ghibli-forest dark:text-gray-200">Drop your PDF here</p>
              <p className="text-sm text-ghibli-forest/70 dark:text-indigo-200/70 mt-1 font-ghibli-handwritten">
                or click to browse
              </p>
            </div>
            <p className="text-xs text-ghibli-forest/60 dark:text-gray-400 max-w-sm">
              Only PDF files up to 50MB are supported. Please ensure your document doesn't contain sensitive information.
            </p>
            
            {/* Decorative elements */}
            <div className="absolute bottom-2 right-2 opacity-10">
              <Wind className="h-8 w-8 text-ghibli-forest dark:text-indigo-300" />
            </div>
            <div className="absolute top-2 left-2 opacity-10">
              {isDark ? (
                <Moon className="h-6 w-6 text-indigo-200" />
              ) : (
                <CloudSun className="h-6 w-6 text-ghibli-forest" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDropzone;
