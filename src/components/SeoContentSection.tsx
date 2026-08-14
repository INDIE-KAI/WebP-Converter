import React from 'react';
import { ShieldCheck, Sparkles, Layers, Cpu, Laptop, Lock, Download } from 'lucide-react';

export const SeoContentSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 border-t border-zinc-100 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        {/* How to Convert Step-by-Step */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold mb-3 border border-zinc-200">
            <Sparkles className="w-3.5 h-3.5 text-zinc-600" />
            <span>Step-by-Step Guide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-4">
            How to Convert WebP to JPG or PNG
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
              <span className="w-7 h-7 rounded-lg bg-zinc-900 text-white font-extrabold text-xs flex items-center justify-center mb-3">
                1
              </span>
              <h3 className="font-bold text-zinc-900 text-sm mb-1">Choose a WebP image</h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                Drag and drop your WebP image into the conversion zone or click to select files from your computer or phone.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
              <span className="w-7 h-7 rounded-lg bg-zinc-900 text-white font-extrabold text-xs flex items-center justify-center mb-3">
                2
              </span>
              <h3 className="font-bold text-zinc-900 text-sm mb-1">Select JPG or PNG</h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                Choose <strong>JPG</strong> for photos and general sharing, or <strong>PNG</strong> to preserve transparency and sharp graphics.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
              <span className="w-7 h-7 rounded-lg bg-zinc-900 text-white font-extrabold text-xs flex items-center justify-center mb-3">
                3
              </span>
              <h3 className="font-bold text-zinc-900 text-sm mb-1">Convert the image</h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                Click <strong>Convert Image</strong> to let your browser decode and process the WebP image instantly on your device.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
              <span className="w-7 h-7 rounded-lg bg-zinc-900 text-white font-extrabold text-xs flex items-center justify-center mb-3">
                4
              </span>
              <h3 className="font-bold text-zinc-900 text-sm mb-1">Download converted file</h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                Save the new JPG or PNG file directly to your downloads, or download all files together in a ZIP archive.
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

        {/* Why Use a Browser-Based WebP Converter? */}
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-zinc-950 tracking-tight">
            Why Use a Browser-Based WebP Converter?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-2">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                <Laptop className="w-4 h-4" />
                <span>No software installation</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                Convert your images without downloading desktop tools, command-line utilities, or browser plugins. Everything runs instantly in any modern web browser.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <Cpu className="w-4 h-4" />
                <span>Local browser processing</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                Image decoding and re-encoding is performed entirely on your device using native HTML5 Canvas APIs, ensuring fast rendering without server queues.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-2">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                <Lock className="w-4 h-4" />
                <span>No signup required</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                Start converting right away without creating an account, giving your email address, or dealing with subscriptions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-2">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                <Download className="w-4 h-4" />
                <span>Convenient conversion</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                Easily drag and drop individual files or multiple WebP images at once, customize format choices, and download with a single click.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
