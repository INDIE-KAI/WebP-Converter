import React, { useState } from 'react';
import { ShieldCheck, Menu, X, Image as ImageIcon, Zap } from 'lucide-react';

interface HeaderProps {
  onSelectFormatFilter?: (format: 'jpg' | 'png') => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectFormatFilter }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo & Branding */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            W
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-zinc-900 tracking-tight text-base sm:text-lg leading-none">
              WebP Converter
            </span>
            <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              100% Browser-based
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
          <button
            onClick={() => {
              if (onSelectFormatFilter) onSelectFormatFilter('jpg');
              scrollToSection('main-converter');
            }}
            className="hover:text-zinc-900 transition-colors py-1 cursor-pointer"
          >
            WebP to JPG
          </button>
          <button
            onClick={() => {
              if (onSelectFormatFilter) onSelectFormatFilter('png');
              scrollToSection('main-converter');
            }}
            className="hover:text-zinc-900 transition-colors py-1 cursor-pointer"
          >
            WebP to PNG
          </button>
          <button
            onClick={() => scrollToSection('privacy-section')}
            className="hover:text-zinc-900 transition-colors py-1 cursor-pointer"
          >
            Privacy
          </button>
          <button
            onClick={() => scrollToSection('use-cases-section')}
            className="hover:text-zinc-900 transition-colors py-1 cursor-pointer"
          >
            Why Convert
          </button>
          <button
            onClick={() => scrollToSection('faq-section')}
            className="hover:text-zinc-900 transition-colors py-1 cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Action badge */}
        <div className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-200/60">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>No file uploads • 100% Private</span>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-100 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <button
            onClick={() => {
              if (onSelectFormatFilter) onSelectFormatFilter('jpg');
              scrollToSection('main-converter');
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-zinc-800 hover:bg-zinc-50 flex items-center justify-between"
          >
            <span>Convert WebP to JPG</span>
            <span className="text-xs bg-zinc-100 px-2 py-0.5 rounded text-zinc-600">Default</span>
          </button>
          <button
            onClick={() => {
              if (onSelectFormatFilter) onSelectFormatFilter('png');
              scrollToSection('main-converter');
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-zinc-800 hover:bg-zinc-50 flex items-center justify-between"
          >
            <span>Convert WebP to PNG</span>
            <span className="text-xs bg-zinc-100 px-2 py-0.5 rounded text-zinc-600">Lossless</span>
          </button>
          <button
            onClick={() => scrollToSection('privacy-section')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-50"
          >
            Privacy Guarantee
          </button>
          <button
            onClick={() => scrollToSection('use-cases-section')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-50"
          >
            Use Cases
          </button>
          <button
            onClick={() => scrollToSection('faq-section')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-50"
          >
            Frequently Asked Questions
          </button>

          <div className="pt-2 border-t border-zinc-100 flex items-center gap-2 text-xs text-emerald-700 font-semibold px-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Files converted on your device only</span>
          </div>
        </div>
      )}
    </header>
  );
};
