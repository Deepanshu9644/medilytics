import { useCallback, useState } from 'react';
import { Upload, X, FileImage } from 'lucide-react';
import { Button } from './ui/button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string;
  maxSizeMB?: number;
}

export function FileUpload({ 
  onFileSelect, 
  acceptedTypes = "image/*",
  maxSizeMB = 10 
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    onFileSelect(file);
  }, [maxSizeMB, onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const removeFile = useCallback(() => {
    setSelectedFile(null);
    setPreview(null);
  }, []);

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative border-2 border-dashed rounded-2xl p-12 text-center transition-all
            ${isDragging 
              ? 'border-white/60 bg-white/20 scale-105' 
              : 'border-white/30 bg-white/5 hover:bg-white/10'
            }
          `}
        >
          <input
            type="file"
            accept={acceptedTypes}
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-white/70" />
            </div>
            
            <div>
              <p className="text-white text-lg mb-2">
                Drag and drop your file here
              </p>
              <p className="text-white/60 text-sm mb-4">
                or
              </p>
              <Button
                type="button"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
                Browse File
              </Button>
            </div>
            
            <p className="text-white/50 text-xs">
              Supports images up to {maxSizeMB}MB
            </p>
          </div>
        </div>
      ) : (
        <div className="relative border-2 border-white/30 rounded-2xl p-6 bg-white/5">
          <button
            onClick={removeFile}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          
          <div className="flex items-center gap-4">
            {preview ? (
              <img 
                src={preview} 
                alt="Preview" 
                className="w-24 h-24 object-cover rounded-xl"
              />
            ) : (
              <div className="w-24 h-24 rounded-xl bg-white/10 flex items-center justify-center">
                <FileImage className="w-8 h-8 text-white/50" />
              </div>
            )}
            
            <div className="flex-1 text-left">
              <p className="text-white mb-1">
                {selectedFile.name}
              </p>
              <p className="text-white/60 text-sm">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
