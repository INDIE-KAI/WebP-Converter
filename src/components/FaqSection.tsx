import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FaqItem } from '../types';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'What is WebP?',
      answer: 'WebP is a modern image format developed by Google that provides superior compression for images on the web. It generates smaller file sizes compared to JPEG and PNG while maintaining similar visual quality.',
    },
    {
      question: 'Why convert WebP to JPG?',
      answer: 'Convert WebP to JPG when you need broad compatibility with older web browsers, graphics editors (like legacy Photoshop versions), Microsoft Office documents, or content management uploaders that do not recognize `.webp` files.',
    },
    {
      question: 'Why convert WebP to PNG?',
      answer: 'Convert WebP to PNG when your image contains transparent backgrounds or sharp graphic text and logo elements that require lossless quality without compression artifacts.',
    },
    {
      question: 'Are my images uploaded to any server?',
      answer: 'No. All conversion operations are performed 100% locally in your web browser using HTML5 Canvas and JavaScript APIs. Your images are never transmitted over the internet or saved on external servers.',
    },
    {
      question: 'Is this WebP converter free to use?',
      answer: 'Yes, this converter is completely free with no hidden subscriptions, no mandatory signups, and no limits on the number of daily conversions.',
    },
    {
      question: 'Can I convert multiple WebP images at once?',
      answer: 'Yes. You can select or drag and drop multiple WebP files simultaneously. Convert them all in a single click and download them individually or as a single packaged ZIP archive.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-12 sm:py-16 border-t border-zinc-100 bg-zinc-50/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/70 text-zinc-800 text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-zinc-600" />
            <span>Answers to common questions</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-2">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-zinc-200/90 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-zinc-900 text-sm sm:text-base flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-50/80 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-zinc-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 pt-0 text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed border-t border-zinc-100/80 mt-1 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
