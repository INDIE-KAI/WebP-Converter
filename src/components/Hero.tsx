import React from 'react';
import { Shield, Zap, HardDriveDownload } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="pt-8 pb-6 sm:pt-12 sm:pb-8 px-4 text-center max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold mb-4 border border-zinc-200/80">
        <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
        <span>Instant Local Conversion</span>
      </div>

      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-zinc-950 tracking-tight leading-[1.15] mb-4">
        Convert WebP to JPG or PNG
      </h1>

      <p className="text-base sm:text-xl text-zinc-600 max-w-2xl mx-auto font-normal leading-relaxed mb-6">
        Free, fast and private. Your images are converted directly in your browser.
      </p>

      {/* Trust Highlights */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-zinc-500">
        <span className="flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-emerald-600" />
          No Server Uploads
        </span>
        <span className="hidden sm:inline text-zinc-300">•</span>
        <span className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-indigo-600" />
          Zero Wait Time
        </span>
        <span className="hidden sm:inline text-zinc-300">•</span>
        <span className="flex items-center gap-1.5">
          <HardDriveDownload className="w-4 h-4 text-blue-600" />
          No Signup Required
        </span>
      </div>
    </section>
  );
};
