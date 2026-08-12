import { GlobalSettings, TargetFormat } from '../types';

export interface ImageMetadata {
  width: number;
  height: number;
  objectUrl: string;
}

/**
 * Loads image metadata (dimensions and object URL) safely.
 */
export async function getImageMetadata(file: File): Promise<ImageMetadata> {
  return new Promise((resolve, reject) => {
    // Basic file validation
    if (!file.type.startsWith('image/') && !file.name.match(/\.(webp|jpg|jpeg|png|gif|bmp|svg|avif)$/i)) {
      return reject(new Error('Selected file does not appear to be an image.'));
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      resolve({
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        objectUrl,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Unable to read or parse image file. The file may be corrupted or unsupported by your browser.'));
    };

    img.src = objectUrl;
  });
}

/**
 * Converts an image file to JPG or PNG 100% client-side in the browser.
 */
export async function convertImageClientSide(
  file: File,
  settings: GlobalSettings,
  onProgress?: (percent: number) => void
): Promise<{
  blob: Blob;
  url: string;
  width: number;
  height: number;
  size: number;
}> {
  if (onProgress) onProgress(10);

  // Load image
  const objectUrl = URL.createObjectURL(file);
  const img = new Image();

  return new Promise((resolve, reject) => {
    img.onload = async () => {
      if (onProgress) onProgress(40);

      try {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;

        // Check memory constraints
        const totalPixels = width * height;
        if (totalPixels > 64000000) { // ~64 Megapixels limit safeguard
          URL.revokeObjectURL(objectUrl);
          return reject(new Error(`Image resolution is extremely large (${width}x${height}). Please resize the file before conversion to prevent browser memory errors.`));
        }

        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { willReadFrequently: false });

        if (!ctx) {
          URL.revokeObjectURL(objectUrl);
          return reject(new Error('Browser canvas 2D rendering context is unavailable.'));
        }

        if (onProgress) onProgress(60);

        // Fill background if converting to JPG (or if custom background is specified)
        if (settings.targetFormat === 'jpg') {
          ctx.fillStyle = settings.backgroundColor || '#ffffff';
          ctx.fillRect(0, 0, width, height);
        } else {
          // Clear canvas for PNG to retain transparency
          ctx.clearRect(0, 0, width, height);
        }

        // Draw original image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        if (onProgress) onProgress(80);

        // Determine MIME type & quality
        const mimeType = settings.targetFormat === 'jpg' ? 'image/jpeg' : 'image/png';
        const quality = settings.targetFormat === 'jpg' ? Math.max(0.1, Math.min(1.0, settings.quality)) : undefined;

        // Export blob
        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(objectUrl); // Clean up original temp URL

            if (!blob) {
              return reject(new Error('Failed to create image blob. Your browser may have blocked canvas encoding.'));
            }

            if (onProgress) onProgress(100);

            const convertedUrl = URL.createObjectURL(blob);
            resolve({
              blob,
              url: convertedUrl,
              width,
              height,
              size: blob.size,
            });
          },
          mimeType,
          quality
        );
      } catch (err: any) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error(err?.message || 'An unexpected error occurred during image conversion.'));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image into canvas. The WebP image file may be invalid.'));
    };

    img.src = objectUrl;
  });
}
