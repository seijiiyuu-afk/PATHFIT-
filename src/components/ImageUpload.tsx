import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';

interface ImageUploadProps {
  id: string;
  label?: string;
  defaultImage?: string;
  className?: string;
  aspectRatio?: string;
  onUpload?: (url: string) => void;
  storagePath?: string;
}

export default function ImageUpload({
  id,
  label = 'Click to upload image',
  defaultImage,
  className = '',
  aspectRatio = '4/3',
  onUpload,
}: ImageUploadProps) {
  const { isAdmin, isPublished, saveImage, getImage } = useAdmin();
  const canEdit = isAdmin && !isPublished;

  const [image, setImage] = useState<string | null>(() => {
    return defaultImage || null;
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load saved image from localStorage via context on mount
  useEffect(() => {
    const saved = getImage(id);
    if (saved) {
      setImage(saved);
    } else if (defaultImage) {
      setImage(defaultImage);
    }
  }, [id, defaultImage, getImage]);

  const processFile = useCallback(async (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;

    setIsUploading(true);
    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        saveImage(id, result);
        if (onUpload) onUpload(result);
        setIsUploading(false);
      };
      reader.onerror = () => {
        console.error('File read error');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
    }
  }, [id, onUpload, saveImage]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (!canEdit) return;
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [canEdit, processFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (canEdit) setIsDragging(true);
  }, [canEdit]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleClick = () => {
    if (canEdit) {
      inputRef.current?.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    saveImage(id, '');
    if (onUpload) onUpload('');
  };

  // Public view (no edit)
  if (!canEdit) {
    return (
      <div className={`relative ${className}`}>
        {image ? (
          <div className="rounded-xl overflow-hidden shadow-md border border-purple-200" style={{ aspectRatio }}>
            <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div
            className="border-2 border-dashed border-purple-200 rounded-lg flex flex-col items-center justify-center bg-purple-50/20"
            style={{ aspectRatio }}
          >
            <ImageIcon size={36} className="text-purple-200 mb-2" />
            <span className="text-purple-300 text-sm">No image uploaded</span>
          </div>
        )}
      </div>
    );
  }

  // Admin edit view
  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {image ? (
        <div
          className={`relative group cursor-pointer rounded-xl overflow-hidden shadow-md border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 ${isDragging ? 'border-purple-600 scale-[1.02] ring-2 ring-purple-300' : ''}`}
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{ aspectRatio }}
        >
          <img src={image} alt="Uploaded" className="w-full h-full object-cover" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/40 transition-all duration-300 flex items-center justify-center">
            <span className="text-white opacity-0 group-hover:opacity-100 flex items-center gap-2 font-medium transition-opacity duration-300">
              <Upload size={18} />
              Click or drag to change
            </span>
          </div>

          {/* Uploading indicator */}
          <AnimatePresence>
            {isUploading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-purple-900/60 flex items-center justify-center"
              >
                <Loader2 className="text-white animate-spin" size={32} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Remove button */}
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 shadow-lg z-10"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center min-h-[150px] cursor-pointer transition-all duration-300 ${isDragging ? 'border-purple-600 bg-purple-100 scale-[1.02] ring-2 ring-purple-300' : 'border-purple-300 bg-purple-50/30 hover:border-purple-500 hover:bg-purple-50/60'}`}
          style={{ aspectRatio }}
        >
          <AnimatePresence mode="wait">
            {isUploading ? (
              <motion.div
                key="uploading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <Loader2 className="text-purple-500 animate-spin mb-2" size={28} />
                <span className="text-purple-500 text-sm">Uploading...</span>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center px-4"
              >
                <Upload size={36} className={`mb-2 transition-colors ${isDragging ? 'text-purple-600' : 'text-purple-300'}`} />
                <span className={`font-medium text-center text-sm transition-colors ${isDragging ? 'text-purple-700' : 'text-purple-400'}`}>
                  {isDragging ? 'Drop image here' : label}
                </span>
                <span className="text-purple-300 text-xs mt-1">Click or drag &amp; drop</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
