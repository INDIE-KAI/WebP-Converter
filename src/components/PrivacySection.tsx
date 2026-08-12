import React from 'react';
import { ShieldCheck, HardDrive, Cpu, Lock } from 'lucide-react';

export const PrivacySection: React.FC = () => {
  return (
    <section id="privacy-section" className="py-12 sm:py-16 border-t border-zinc-100 bg-zinc-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200/60">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Client-Side Privacy</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-3">
            Your images stay on your device
          </h2>

          <p className="text-base text-zinc-600 font-normal leading-relaxed">
            Conversion happens directly in your browser. Your images are not uploaded to our servers.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center font-bold mb-4">
              <HardDrive className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-bold text-zinc-900 text-base mb-2">Zero File Uploads</h3>
            <p className="text-sm text-zinc-600 leading-relaxed font-normal">
              Your WebP image files remain strictly stored in your local browser memory. No network traffic carries your photo data.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center font-bold mb-4">
              <Cpu className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="font-bold text-zinc-900 text-base mb-2">Instant Local Processing</h3>
            <p className="text-sm text-zinc-600 leading-relaxed font-normal">
              Uses your device's native CPU and WebGL/Canvas graphics hardware. No server queues or upload bandwidth limits.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center font-bold mb-4">
              <Lock className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-bold text-zinc-900 text-base mb-2">Complete Data Control</h3>
            <p className="text-sm text-zinc-600 leading-relaxed font-normal">
              Once you close or refresh this tab, all converted memory blobs are immediately discarded by your browser.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
