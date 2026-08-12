import React from 'react';
import { Layers, CheckCircle, Globe, Monitor, Printer, Mail } from 'lucide-react';

export const UseCasesSection: React.FC = () => {
  const useCases = [
    {
      icon: <Globe className="w-5 h-5 text-indigo-600" />,
      title: 'Content Management Systems (CMS)',
      description: 'Older CMS setups, custom plugins, or legacy WordPress themes may block `.webp` uploads or fail to generate automated thumbnails.',
    },
    {
      icon: <Monitor className="w-5 h-5 text-blue-600" />,
      title: 'E-commerce & Storefronts',
      description: 'Certain product catalog tools or platforms like Shopify or Wix may require standard JPG files for legacy marketplace exports.',
    },
    {
      icon: <Mail className="w-5 h-5 text-amber-500" />,
      title: 'Email Templates & Marketing',
      description: 'Legacy desktop email clients (e.g. older versions of Outlook) may render broken image icons for WebP attachments.',
    },
    {
      icon: <Printer className="w-5 h-5 text-emerald-600" />,
      title: 'Print & Offline Publishing',
      description: 'Commercial printing software, PDF prepress tools, and office suites often expect high-resolution JPG or PNG formats.',
    },
  ];

  return (
    <section id="use-cases-section" className="py-12 sm:py-16 border-t border-zinc-100 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold mb-3 border border-zinc-200">
            <Layers className="w-3.5 h-3.5 text-zinc-600" />
            <span>Format Compatibility</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-3">
            Why convert WebP to JPG or PNG?
          </h2>

          <p className="text-base text-zinc-600 font-normal leading-relaxed">
            While WebP offers excellent compression for modern web browsers, converting to standard JPG or PNG ensures 100% compatibility across all software.
          </p>
        </div>

        {/* Grid of Use Cases */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {useCases.map((item, index) => (
            <div key={index} className="p-5 rounded-2xl bg-zinc-50/80 border border-zinc-200/80 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 shadow-2xs flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <h3 className="font-bold text-zinc-900 text-base">{item.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal pt-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Neutral Disclaimer */}
        <p className="text-[11px] text-zinc-400 text-center mt-8 font-medium">
          Note: Mentioned platform names (such as WordPress, Shopify, Wix, Outlook) are trademarks of their respective owners and are referenced solely to illustrate common software compatibility scenarios.
        </p>
      </div>
    </section>
  );
};
