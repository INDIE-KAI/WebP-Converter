import React from 'react';
import { FileImage, ShieldCheck, Sparkles, Layers, CheckCircle2 } from 'lucide-react';

export const SeoContentSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 border-t border-zinc-100 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        {/* How to Convert Step-by-Step */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold mb-3 border border-zinc-200">
            <Sparkles className="w-3.5 h-3.5 text-zinc-600" />
            <span>Quick Guide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-4">
            How to convert WebP to JPG or PNG
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
              <span className="w-7 h-7 rounded-lg bg-zinc-900 text-white font-extrabold text-xs flex items-center justify-center mb-3">
                1
              </span>
              <h3 className="font-bold text-zinc-900 text-sm mb-1">Select your WebP image</h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                Drag and drop your WebP image into the conversion area, choose a file from your device, or paste from your clipboard.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
              <span className="w-7 h-7 rounded-lg bg-zinc-900 text-white font-extrabold text-xs flex items-center justify-center mb-3">
                2
              </span>
              <h3 className="font-bold text-zinc-900 text-sm mb-1">Choose target format</h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                Select <strong>JPG</strong> for standard compressed photos or <strong>PNG</strong> to preserve transparent backgrounds and sharp details.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
              <span className="w-7 h-7 rounded-lg bg-zinc-900 text-white font-extrabold text-xs flex items-center justify-center mb-3">
                3
              </span>
              <h3 className="font-bold text-zinc-900 text-sm mb-1">Download instantly</h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                Click <strong>Convert Image</strong> to process the file in your browser and save the output image or ZIP archive directly to your device.
              </p>
            </div>
          </div>
        </div>

        {/* Formats Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-50/80 border border-zinc-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold text-sm">
              JPG
            </div>
            <h2 className="text-xl font-bold text-zinc-900">
              WebP to JPG Converter
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              Converting WebP to JPG (JPEG) is ideal when you need maximum compatibility across older operating systems, desktop software, or content management systems that do not recognize WebP files. JPG balances visual quality with reduced file sizes for universal sharing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50/80 border border-zinc-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-extrabold text-sm">
              PNG
            </div>
            <h2 className="text-xl font-bold text-zinc-900">
              WebP to PNG Converter
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              Converting WebP to PNG provides lossless quality rendering and preserves alpha channel transparency. This format is recommended for logos, diagrams, screenshots, or graphics containing crisp typography and transparent background layers.
            </p>
          </div>
        </div>

        {/* Why Convert & Is Privacy Guaranteed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Compatibility</span>
            </div>
            <h2 className="text-lg font-bold text-zinc-900">
              Why convert WebP images?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              While WebP is optimized for web loading speeds, many legacy applications, graphics editing suites, offline document viewers, and email publishing templates require traditional JPG or PNG image files. Converting WebP guarantees your images open without display errors anywhere.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Security</span>
            </div>
            <h2 className="text-lg font-bold text-zinc-900">
              Is this converter private?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              Yes, 100%. Conversion runs entirely within your device browser using native HTML5 Canvas rendering. Your files never leave your device, are never transmitted over the web, and are never saved to cloud servers or databases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
