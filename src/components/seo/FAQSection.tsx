import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQSectionData } from '../../types/seo';

interface FAQSectionProps {
  data?: FAQSectionData;
  toolName?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ data, toolName }) => {
  if (!data || !data.faqs || data.faqs.length === 0) return null;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Generate FAQPage JSON-LD Schema
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="space-y-6">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <HelpCircle className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          {data.heading || `Frequently Asked Questions ${toolName ? `About ${toolName}` : ''}`}
        </h2>
      </div>

      <div className="space-y-3">
        {data.faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden transition-all">
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-900 text-sm sm:text-base">{faq.question}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
