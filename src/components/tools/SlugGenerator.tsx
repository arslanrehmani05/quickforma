import React, { useState } from 'react';
import { Tag, Copy, Check } from 'lucide-react';

export const SlugGenerator: React.FC = () => {
  const [headline, setHeadline] = useState('10 Best Client Side Utility Tools For Freelancers In 2026!');
  const [copied, setCopied] = useState(false);

  const slug = (headline || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">SEO URL Slug Sanitizer</h2>
            <p className="text-slate-600 text-sm">Convert article headlines and page titles into clean, lowercase, hyphenated URL slugs.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Headline / Article Title</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
            />
          </div>

          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-between font-mono text-sm text-indigo-900 font-bold">
            <span>{slug || 'your-slug-here'}</span>
            <button onClick={handleCopy} className="hover:text-indigo-600 flex items-center gap-1 text-xs font-sans">
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
