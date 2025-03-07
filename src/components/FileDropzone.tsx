
import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileType, Check } from 'lucide-react';
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
      toast.error('Please upload a PDF file');
      return false;
    }
    
    // Check file size (limit to 10MB)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      toast.error('File is too large. Please upload a file smaller than 10MB');
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
        "relative w-full max-w-2xl mx-auto rounded-xl p-12 transition-all duration-300 ease-in-out border-2 border-dashed",
        isDragging ? "border-blog-purple bg-blog-light-purple/50 dropzone-active" : "border-gray-300 bg-secondary/50",
        isProcessing ? "pointer-events-none opacity-70" : "hover:bg-blog-light-purple/30 cursor-pointer",
        file && !isProcessing ? "bg-blog-light-purple/20 border-blog-purple/50" : ""
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
              <FileType className="h-16 w-16 text-blog-purple opacity-70" />
            </div>
            <div className="text-lg font-medium text-muted-foreground">Processing your PDF...</div>
            <div className="loading-dots mt-2">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : file ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative h-16 w-16">
              <FileType className="h-16 w-16 text-blog-purple" />
              <div className="absolute -right-1 -bottom-1 bg-blog-purple rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <p className="text-lg font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-blog-light-purple p-4 animate-float">
              <Upload className="h-8 w-8 text-blog-purple" />
            </div>
            <div>
              <p className="text-lg font-medium">Drop your PDF here</p>
              <p className="text-sm text-muted-foreground mt-1">
                or click to browse
              </p>
            </div>
            <p className="text-xs text-muted-foreground max-w-sm">
              Only PDF files up to 10MB are supported. Please ensure your document doesn't contain sensitive information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDropzone;
