import React, { useState } from 'react';
import { ImageItem, GlobalSettings } from '../types';
import { formatBytes, calculateSizeSavings, getConvertedFilename } from '../utils/formatters';
import { Download, Trash2, CheckCircle2, AlertCircle, RefreshCw, Eye, ArrowRight, ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface FileCardProps {
  item: ImageItem;
  settings: GlobalSettings;
  onConvertSingle: (id: string) => void;
  onRemoveSingle: (id: string) => void;
}

export const FileCard: React.FC<FileCardProps> = ({
  item,
  settings,
  onConvertSingle,
  onRemoveSingle,
}) => {
  const [activeTab, setActiveTab] = useState<'after' | 'before' | 'compare'>('after');
  const [downloading, setDownloading] = useState(false);

  const isConverted = item.status === 'success' && item.convertedUrl;
  const isConverting = item.status === 'converting';
  const isError = item.status === 'error';

  const outputFilename = getConvertedFilename(item.name, item.targetFormat);

  const handleDownload = () => {
    if (!item.convertedUrl || !item.convertedBlob) return;

    setDownloading(true);
    const link = document.createElement('a');
    link.href = item.convertedUrl;
    link.download = outputFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloading(false);
    }, 600);
  };

  const savings = isConverted && item.convertedSize
    ? calculateSizeSavings(item.originalSize, item.convertedSize)
    : null;

  return (
    <div className="bg-white border border-zinc-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow">
      {/* Top Header Bar */}
      <div className="p-4 sm:p-5 bg-zinc-50/50 border-b border-zinc-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-zinc-200/70 border border-zinc-300/60 overflow-hidden shrink-0 flex items-center justify-center">
            <img
              src={item.originalUrl}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-zinc-900 text-sm sm:text-base truncate" title={item.name}>
              {item.name}
            </h4>
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
              <span>{item.originalWidth} × {item.originalHeight} px</span>
              <span>•</span>
              <span className="font-semibold text-zinc-700">{formatBytes(item.originalSize)}</span>
            </div>
          </div>
        </div>

        {/* Status Badge & Remove Button */}
        <div className="flex items-center gap-2">
          {isConverted && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Converted</span>
            </span>
          )}

          {isConverting && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              <span>Processing...</span>
            </span>
          )}

          {isError && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              <span>Failed</span>
            </span>
          )}

          <button
            onClick={() => onRemoveSingle(item.id)}
            className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            title="Remove file"
            aria-label="Remove image"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Error Display */}
        {isError && item.errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold">Conversion Error</p>
              <p className="mt-0.5">{item.errorMessage}</p>
            </div>
          </div>
        )}

        {/* If converted: show preview & stats */}
        {isConverted ? (
          <div className="space-y-4">
            {/* View Mode Tabs */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
              <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('after')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTab === 'after' ? 'bg-white text-zinc-900 shadow-2xs font-bold' : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  Converted ({item.targetFormat.toUpperCase()})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('before')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTab === 'before' ? 'bg-white text-zinc-900 shadow-2xs font-bold' : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  Original (WebP)
                </button>
              </div>

              {/* Size Savings Indicator */}
              {savings && (
                <div
                  className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg ${
                    savings.isSmaller
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                      : 'bg-zinc-100 text-zinc-700'
                  }`}
                >
                  {savings.isSmaller ? (
                    <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                  )}
                  <span>{savings.text}</span>
                </div>
              )}
            </div>

            {/* Preview Image Box */}
            <div className="relative bg-zinc-900/5 rounded-xl overflow-hidden border border-zinc-200 flex items-center justify-center min-h-[200px] max-h-[360px] p-2 group">
              <img
                src={activeTab === 'after' ? item.convertedUrl! : item.originalUrl}
                alt={activeTab === 'after' ? outputFilename : item.name}
                className="max-h-[340px] w-auto object-contain rounded-lg shadow-sm"
              />

              {/* Format Badge Overlay */}
              <div className="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur-md text-white text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider">
                {activeTab === 'after' ? item.targetFormat : 'webp'}
              </div>
            </div>

            {/* Converted Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-zinc-50 p-3 rounded-xl border border-zinc-100">
              <div>
                <span className="text-zinc-400 font-medium block text-[11px]">Output Format</span>
                <span className="font-extrabold text-zinc-900 uppercase">{item.targetFormat}</span>
              </div>
              <div>
                <span className="text-zinc-400 font-medium block text-[11px]">Dimensions</span>
                <span className="font-extrabold text-zinc-900">{item.convertedWidth} × {item.convertedHeight} px</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-zinc-400 font-medium block text-[11px]">Output File Size</span>
                <span className="font-extrabold text-emerald-600">{formatBytes(item.convertedSize!)}</span>
              </div>
            </div>

            {/* Primary Download Button */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <Download className={`w-4 h-4 ${downloading ? 'animate-bounce' : ''}`} />
                <span>Download {item.targetFormat.toUpperCase()}</span>
              </button>

              <button
                type="button"
                onClick={() => onConvertSingle(item.id)}
                className="w-full sm:w-auto py-3.5 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold rounded-xl transition-colors text-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                title="Re-convert image"
              >
                <RefreshCw className="w-3.5 h-3.5 text-zinc-500" />
                <span>Re-convert</span>
              </button>
            </div>
          </div>
        ) : (
          /* Unconverted state - Ready to convert */
          <div className="space-y-4">
            <div className="relative bg-zinc-100/70 rounded-xl overflow-hidden border border-zinc-200/60 flex items-center justify-center h-48 p-2">
              <img
                src={item.originalUrl}
                alt={item.name}
                className="max-h-44 w-auto object-contain rounded-md"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="text-xs text-zinc-500 font-medium">
                Target: <span className="font-bold text-zinc-900 uppercase">{item.targetFormat}</span>
              </div>

              <button
                type="button"
                onClick={() => onConvertSingle(item.id)}
                disabled={isConverting}
                className="py-2.5 px-5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isConverting ? 'animate-spin' : ''}`} />
                <span>{isConverting ? 'Converting...' : `Convert to ${item.targetFormat.toUpperCase()}`}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
