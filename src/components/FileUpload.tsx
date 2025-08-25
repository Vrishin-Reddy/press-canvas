
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  accept?: string;
  maxFileSize?: number; // in MB
}

const FileUpload = ({ 
  onFileChange, 
  accept = "application/pdf,image/jpeg,image/png,image/tiff", 
  maxFileSize = 10 // 10MB default
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile: File | null) => {
    if (!selectedFile) return;
    
    // Check file size (convert MB to bytes)
    if (selectedFile.size > maxFileSize * 1024 * 1024) {
      toast.error(`File is too large. Maximum size is ${maxFileSize}MB.`);
      return;
    }

    setFile(selectedFile);
    onFileChange(selectedFile);
    toast.success("File uploaded successfully!");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0] || null;
    validateAndSetFile(droppedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveFile = () => {
    setFile(null);
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept={accept}
      />

      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-input hover:border-primary'
          }`}
          onClick={triggerFileInput}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col items-center space-y-3">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <div>
              <p className="text-lg font-medium">Drag and drop your file here</p>
              <p className="text-sm text-muted-foreground mt-1">or click to browse files</p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Supported formats: PDF, JPG, PNG, TIFF (max {maxFileSize}MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleRemoveFile}
              aria-label="Remove file"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
