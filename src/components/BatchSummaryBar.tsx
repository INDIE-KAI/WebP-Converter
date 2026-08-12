import React, { useState } from 'react';
import { ImageItem } from '../types';
import { formatBytes, getConvertedFilename } from '../utils/formatters';
import { Download, Archive, Trash2, Plus, Sparkles, CheckCircle2 } from 'lucide-react';
import JSZip from 'jszip';

interface BatchSummaryBarProps {
  items: ImageItem[];
  onClearAll: () => void;
  onAddMoreClick: () => void;
}

export const BatchSummaryBar: React.FC<BatchSummaryBarProps> = ({
  items,
  onClearAll,
  onAddMoreClick,
}) => {
  const [zipping, setZipping] = useState(false);

  const convertedItems = items.filter((item) => item.status === 'success' && item.convertedBlob);
  const totalItems = items.length;
  const isAllConverted = convertedItems.length > 0 && convertedItems.length === totalItems;

  const totalOriginalBytes = items.reduce((sum, item) => sum + item.originalSize, 0);
  const totalConvertedBytes = convertedItems.reduce(
    (sum, item) => sum + (item.convertedSize || 0),
    0
  );

  const handleDownloadZip = async () => {
    if (convertedItems.length === 0) return;

    try {
      setZipping(true);
      const zip = new JSZip();

      // Track duplicate filenames
      const nameCounts = new Map<string, number>();

      for (const item of convertedItems) {
        if (!item.convertedBlob) continue;
        let filename = getConvertedFilename(item.name, item.targetFormat);

        if (nameCounts.has(filename)) {
          const count = nameCounts.get(filename)! + 1;
          nameCounts.set(filename, count);
          const dot = filename.lastIndexOf('.');
          filename = `${filename.substring(0, dot)}_${count}${filename.substring(dot)}`;
        } else {
          nameCounts.set(filename, 1);
        }

        zip.file(filename, item.convertedBlob);
      }

      const zipContent = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(zipContent);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `converted_images_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Failed to generate ZIP archive', err);
    } finally {
      setZipping(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="sticky bottom-4 z-30 max-w-3xl mx-auto px-4 my-6">
      <div className="bg-zinc-950 text-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status info */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-emerald-400 shrink-0 font-bold">
            {convertedItems.length}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white">
                {convertedItems.length} of {totalItems} converted
              </span>
              {isAllConverted && (
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Done
                </span>
              )}
            </div>
            {convertedItems.length > 0 && (
              <p className="text-xs text-zinc-400 font-medium mt-0.5">
                Total size: {formatBytes(totalConvertedBytes)}
              </p>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onAddMoreClick}
            className="px-3.5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Files</span>
          </button>

          {convertedItems.length > 1 && (
            <button
              type="button"
              onClick={handleDownloadZip}
              disabled={zipping}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Archive className={`w-4 h-4 ${zipping ? 'animate-spin' : ''}`} />
              <span>{zipping ? 'Creating ZIP...' : 'Download All (ZIP)'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClearAll}
            className="p-2.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-xl transition-colors cursor-pointer"
            title="Convert another / Clear list"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
