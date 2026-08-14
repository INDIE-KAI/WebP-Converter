import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FaqItem } from '../types';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'What is a WebP image?',
      answer: 'WebP is a modern image format developed to deliver smaller file sizes on websites while preserving visual quality. While supported in modern browsers, older software, desktop image editors, and legacy platforms often require standard JPG or PNG files.',
    },
    {
      question: 'How do I convert WebP to JPG?',
      answer: 'To convert WebP to JPG, drag and drop your WebP file into the converter or click "Choose WebP File". Ensure "JPG" is selected as your output format, click "Convert Image", and download your converted file instantly.',
    },
    {
      question: 'How do I convert WebP to PNG?',
      answer: 'To convert WebP to PNG, upload your WebP image, select "PNG" as your target format, and click "Convert Image". PNG is recommended when you need to preserve transparent backgrounds and crisp graphic lines.',
    },
    {
      question: 'Are my images uploaded to a server?',
      answer: 'No. All conversion operations take place 100% locally inside your web browser using HTML5 Canvas technology. Your photos are never sent to external servers or stored anywhere online.',
    },
    {
      question: 'Do I need to install software?',
      answer: 'No. You do not need to download or install any desktop applications, browser extensions, or plugins. The converter runs directly in any modern desktop or mobile web browser.',
    },
    {
      question: 'Can I convert multiple WebP images at once?',
      answer: 'Yes. You can select or drag and drop multiple WebP images at once to perform batch conversion. Once converted, you can download all files together in a convenient ZIP archive or save them individually.',
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
