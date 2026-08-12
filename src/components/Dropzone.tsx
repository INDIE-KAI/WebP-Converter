import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, FileImage, Clipboard, Sparkles, Plus, AlertCircle } from 'lucide-react';
import { createSampleWebPFile } from '../utils/sampleImage';

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
  isLoadingSample?: boolean;
  onLoadSample: () => void;
  fileCount: number;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFilesSelected,
  isLoadingSample,
  onLoadSample,
  fileCount,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  // Handle Drag Events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      onFilesSelected(droppedFiles);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      onFilesSelected(selectedFiles);
      // Reset input value so same file can be selected again
      e.target.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div id="main-converter" className="w-full max-w-3xl mx-auto px-4 mb-8">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/webp, .webp, image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        id="webp-file-input"
      />

      {/* Main Upload Box */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
        className={`relative cursor-pointer rounded-2xl p-8 sm:p-12 text-center transition-all duration-200 border-2 border-dashed ${
          isDragging
            ? 'border-indigo-600 bg-indigo-50/80 shadow-lg scale-[1.01]'
            : 'border-zinc-300 hover:border-zinc-400 bg-zinc-50/60 hover:bg-zinc-50'
        }`}
      >
        <div className="flex flex-col items-center justify-center max-w-md mx-auto space-y-4">
          {/* Animated Icon Container */}
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-transform ${
              isDragging ? 'bg-indigo-600 text-white scale-110' : 'bg-zinc-900 text-white shadow-md'
            }`}
          >
            <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2]" />
          </div>

          {/* Primary Text */}
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              Drop your WebP image here
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-medium">
              Supports single or batch file conversion
            </p>
          </div>

          {/* Divider "or" */}
          <div className="flex items-center gap-3 w-full max-w-xs py-1">
            <div className="h-px bg-zinc-200 flex-1"></div>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">or</span>
            <div className="h-px bg-zinc-200 flex-1"></div>
          </div>

          {/* Prominent Action Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleButtonClick();
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 text-base cursor-pointer"
          >
            <FileImage className="w-5 h-5 text-zinc-300" />
            <span>Choose WebP File</span>
          </button>

          {/* Secondary Info & Clipboard Hint */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-zinc-500 font-medium">
            <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-zinc-200/80 shadow-2xs">
              <Clipboard className="w-3.5 h-3.5 text-zinc-400" />
              <span>Paste from clipboard (Ctrl+V)</span>
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onLoadSample();
              }}
              disabled={isLoadingSample}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold underline underline-offset-2 hover:bg-indigo-50 px-2 py-1 rounded transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{isLoadingSample ? 'Generating sample...' : 'Try sample WebP image'}</span>
            </button>
          </div>
        </div>

        {/* Drag Overlay Banner */}
        {isDragging && (
          <div className="absolute inset-0 bg-indigo-600/10 backdrop-blur-3xs rounded-2xl flex items-center justify-center border-2 border-indigo-600 pointer-events-none">
            <div className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-xl flex items-center gap-2 animate-bounce">
              <Plus className="w-6 h-6" />
              <span>Drop files to convert</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
