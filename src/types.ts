export type TargetFormat = 'jpg' | 'png';

export type ConversionStatus = 'idle' | 'converting' | 'success' | 'error';

export interface ImageItem {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  originalWidth: number;
  originalHeight: number;
  originalUrl: string;
  targetFormat: TargetFormat;
  status: ConversionStatus;
  progress: number;
  convertedBlob: Blob | null;
  convertedUrl: string | null;
  convertedSize: number | null;
  convertedWidth: number | null;
  convertedHeight: number | null;
  errorMessage: string | null;
}

export interface GlobalSettings {
  targetFormat: TargetFormat;
  quality: number; // 0.1 to 1.0 (for JPG)
  backgroundColor: string; // for transparency replacement in JPG (e.g. #ffffff)
}

export interface FaqItem {
  question: string;
  answer: string;
}
