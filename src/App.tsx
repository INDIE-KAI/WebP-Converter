import React, { useState, useEffect, useCallback } from 'react';
import { ImageItem, GlobalSettings, TargetFormat } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Dropzone } from './components/Dropzone';
import { ConversionControls } from './components/ConversionControls';
import { FileCard } from './components/FileCard';
import { BatchSummaryBar } from './components/BatchSummaryBar';
import { PrivacySection } from './components/PrivacySection';
import { UseCasesSection } from './components/UseCasesSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { getImageMetadata, convertImageClientSide } from './utils/imageConverter';
import { createSampleWebPFile } from './utils/sampleImage';
import { Image as ImageIcon, Sparkles, RefreshCw, Trash2, ArrowUpCircle } from 'lucide-react';

export default function App() {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [settings, setSettings] = useState<GlobalSettings>({
    targetFormat: 'jpg',
    quality: 0.92,
    backgroundColor: '#ffffff',
  });
  const [isConverting, setIsConverting] = useState(false);
  const [isLoadingSample, setIsLoadingSample] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Helper
  const addToast = useCallback((title: string, message?: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Update settings and trigger re-conversion for idle or already converted items if user changes target format
  const handleSettingsChange = (newSettings: Partial<GlobalSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      // If target format changed, update all existing items to target format
      if (newSettings.targetFormat && newSettings.targetFormat !== prev.targetFormat) {
        setItems((currentItems) =>
          currentItems.map((item) => ({
            ...item,
            targetFormat: newSettings.targetFormat as TargetFormat,
          }))
        );
      }
      return updated;
    });
  };

  // Process and add files
  const handleFilesSelected = useCallback(
    async (files: File[]) => {
      if (!files || files.length === 0) return;

      const validFiles: File[] = [];
      let rejectedCount = 0;

      for (const file of files) {
        // Accept WebP and general image files
        if (file.type.startsWith('image/') || file.name.match(/\.(webp|jpg|jpeg|png|gif|bmp|avif)$/i)) {
          validFiles.push(file);
        } else {
          rejectedCount++;
        }
      }

      if (rejectedCount > 0) {
        addToast(
          'Non-image files skipped',
          `${rejectedCount} file(s) were skipped as they do not appear to be images.`,
          'info'
        );
      }

      if (validFiles.length === 0) return;

      const newItems: ImageItem[] = [];

      for (const file of validFiles) {
        const id = Math.random().toString(36).substring(2, 11);
        try {
          const meta = await getImageMetadata(file);
          newItems.push({
            id,
            file,
            name: file.name,
            originalSize: file.size,
            originalWidth: meta.width,
            originalHeight: meta.height,
            originalUrl: meta.objectUrl,
            targetFormat: settings.targetFormat,
            status: 'idle',
            progress: 0,
            convertedBlob: null,
            convertedUrl: null,
            convertedSize: null,
            convertedWidth: null,
            convertedHeight: null,
            errorMessage: null,
          });
        } catch (err: any) {
          addToast(
            'Unable to load image',
            err?.message || `Failed to read file ${file.name}`,
            'error'
          );
        }
      }

      if (newItems.length > 0) {
        setItems((prev) => [...prev, ...newItems]);
        addToast(
          'Images loaded',
          `Added ${newItems.length} file(s). Click 'Convert' to process.`,
          'success'
        );
      }
    },
    [settings.targetFormat, addToast]
  );

  // Convert a single item
  const convertSingleItem = useCallback(
    async (id: string) => {
      const targetItem = items.find((item) => item.id === id);
      if (!targetItem) return;

      // Update status to converting
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: 'converting', progress: 10, errorMessage: null }
            : item
        )
      );

      try {
        const result = await convertImageClientSide(
          targetItem.file,
          settings,
          (progress) => {
            setItems((prev) =>
              prev.map((item) => (item.id === id ? { ...item, progress } : item))
            );
          }
        );

        setItems((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: 'success',
                  progress: 100,
                  convertedBlob: result.blob,
                  convertedUrl: result.url,
                  convertedSize: result.size,
                  convertedWidth: result.width,
                  convertedHeight: result.height,
                }
              : item
          )
        );
      } catch (err: any) {
        setItems((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: 'error',
                  progress: 0,
                  errorMessage: err?.message || 'Failed to convert image.',
                }
              : item
          )
        );
        addToast('Conversion Error', err?.message || 'Error converting image', 'error');
      }
    },
    [items, settings, addToast]
  );

  // Convert all unconverted/idle items
  const convertAllItems = useCallback(async () => {
    const toConvert = items.filter(
      (item) => item.status === 'idle' || item.status === 'error'
    );
    if (toConvert.length === 0) return;

    setIsConverting(true);

    for (const item of toConvert) {
      // Convert sequentially to prevent browser canvas memory spikes
      await convertSingleItem(item.id);
    }

    setIsConverting(false);
    addToast('Batch Complete', 'All images processed successfully.', 'success');
  }, [items, convertSingleItem, addToast]);

  // Load sample WebP image
  const handleLoadSample = async () => {
    setIsLoadingSample(true);
    try {
      const sampleFile = await createSampleWebPFile();
      await handleFilesSelected([sampleFile]);
    } catch (err: any) {
      addToast('Sample Generation Failed', err?.message, 'error');
    } finally {
      setIsLoadingSample(false);
    }
  };

  // Remove single item
  const handleRemoveSingle = (id: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.originalUrl) URL.revokeObjectURL(target.originalUrl);
      if (target?.convertedUrl) URL.revokeObjectURL(target.convertedUrl);
      return prev.filter((item) => item.id !== id);
    });
  };

  // Clear all items
  const handleClearAll = () => {
    items.forEach((item) => {
      if (item.originalUrl) URL.revokeObjectURL(item.originalUrl);
      if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
    });
    setItems([]);
  };

  // Clipboard Paste Listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData || !e.clipboardData.files) return;

      const pastedFiles: File[] = [];
      for (let i = 0; i < e.clipboardData.files.length; i++) {
        const file = e.clipboardData.files[i];
        if (file.type.startsWith('image/')) {
          pastedFiles.push(file);
        }
      }

      if (pastedFiles.length > 0) {
        e.preventDefault();
        handleFilesSelected(pastedFiles);
        addToast('Clipboard Image Pasted', `Loaded ${pastedFiles.length} image(s) from clipboard.`, 'info');
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleFilesSelected, addToast]);

  const unconvertedCount = items.filter((i) => i.status !== 'success').length;

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col antialiased selection:bg-indigo-100 selection:text-indigo-900">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Header */}
      <Header
        onSelectFormatFilter={(format) => handleSettingsChange({ targetFormat: format })}
      />

      <main className="flex-1 pb-16">
        {/* Hero Section */}
        <Hero />

        {/* Main Upload Dropzone */}
        <Dropzone
          onFilesSelected={handleFilesSelected}
          isLoadingSample={isLoadingSample}
          onLoadSample={handleLoadSample}
          fileCount={items.length}
        />

        {/* Loaded Files Section */}
        {items.length > 0 && (
          <section className="max-w-3xl mx-auto px-4 mb-12">
            {/* Global Settings Bar */}
            <ConversionControls
              settings={settings}
              onChangeSettings={handleSettingsChange}
              onConvertAll={convertAllItems}
              isConverting={isConverting}
              totalFiles={items.length}
              unconvertedCount={unconvertedCount}
            />

            {/* List of Files */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-500 uppercase tracking-wider px-1">
                <span>Selected Images ({items.length})</span>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-zinc-400 hover:text-red-600 transition-colors cursor-pointer font-semibold lowercase"
                >
                  Clear all
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {items.map((item) => (
                  <FileCard
                    key={item.id}
                    item={item}
                    settings={settings}
                    onConvertSingle={convertSingleItem}
                    onRemoveSingle={handleRemoveSingle}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Batch Floating Summary Bar */}
        <BatchSummaryBar
          items={items}
          onClearAll={handleClearAll}
          onAddMoreClick={() => {
            const input = document.getElementById('webp-file-input') as HTMLInputElement;
            if (input) input.click();
          }}
        />

        {/* Privacy Section */}
        <PrivacySection />

        {/* Use Cases Section */}
        <UseCasesSection />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
