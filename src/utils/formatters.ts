/**
 * Formats a byte size into a human-readable string (e.g. "1.2 MB" or "450 KB").
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Calculates percentage difference between original size and converted size.
 */
export function calculateSizeSavings(originalSize: number, convertedSize: number): {
  percent: number;
  isSmaller: boolean;
  text: string;
} {
  if (!originalSize || !convertedSize) {
    return { percent: 0, isSmaller: false, text: '' };
  }
  const diff = originalSize - convertedSize;
  const percent = Math.abs(Math.round((diff / originalSize) * 100));
  const isSmaller = diff > 0;

  if (diff === 0) {
    return { percent: 0, isSmaller: false, text: 'Same size' };
  }

  return {
    percent,
    isSmaller,
    text: isSmaller ? `${percent}% smaller` : `${percent}% larger`,
  };
}

/**
 * Generates converted output filename.
 */
export function getConvertedFilename(originalName: string, targetFormat: 'jpg' | 'png'): string {
  const lastDot = originalName.lastIndexOf('.');
  const baseName = lastDot > 0 ? originalName.substring(0, lastDot) : originalName;
  const extension = targetFormat === 'jpg' ? 'jpg' : 'png';
  return `${baseName}.${extension}`;
}
