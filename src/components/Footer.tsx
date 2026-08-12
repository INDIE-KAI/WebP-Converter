import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white py-8 px-4 text-xs text-zinc-500 font-medium">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-zinc-900 text-white font-extrabold flex items-center justify-center text-xs">
            W
          </div>
          <span className="font-bold text-zinc-800">WebP Converter</span>
          <span>•</span>
          <span>In-browser local converter</span>
        </div>

        <div className="flex items-center gap-6 text-zinc-600 font-semibold">
          <a href="#privacy-section" className="hover:text-zinc-950 transition-colors">
            Privacy
          </a>
          <a href="#faq-section" className="hover:text-zinc-950 transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};
