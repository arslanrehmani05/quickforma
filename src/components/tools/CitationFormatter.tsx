import React, { useState, useMemo } from 'react';
import { Sparkles, BookOpen, Copy, Check } from 'lucide-react';
import { formatCitation, CitationSource } from '../../utils/formatting/textEngine';

export const CitationFormatter: React.FC = () => {
  const [style, setStyle] = useState<'APA' | 'MLA' | 'Chicago' | 'IEEE'>('APA');
  const [sourceType, setSourceType] = useState<'Journal' | 'Book' | 'Website'>('Journal');
  const [authorLastName, setAuthorLastName] = useState<string>('Smith');
  const [authorFirstName, setAuthorFirstName] = useState<string>('John');
  const [title, setTitle] = useState<string>('Advances in Artificial Intelligence in Modern Higher Education');
  const [containerTitle, setContainerTitle] = useState<string>('Journal of Educational Technology');
  const [year, setYear] = useState<string>('2025');
  const [volume, setVolume] = useState<string>('14');
  const [issue, setIssue] = useState<string>('2');
  const [pages, setPages] = useState<string>('145-162');
  const [urlOrDoi, setUrlOrDoi] = useState<string>('10.1016/j.jedtech.2025.04.012');

  const [copied, setCopied] = useState<boolean>(false);

  const citation = useMemo(() => {
    return formatCitation({
      style,
      sourceType,
      authorLastName,
      authorFirstName,
      title,
      containerTitle,
      year,
      volume,
      issue,
      pages,
      urlOrDoi,
    });
  }, [style, sourceType, authorLastName, authorFirstName, title, containerTitle, year, volume, issue, pages, urlOrDoi]);

  const handleCopy = () => {
    navigator.clipboard.writeText(citation.fullBibliographic);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Academic Citation Formatter</h2>
            <p className="text-xs text-slate-500">
              Format accurate in-text and full bibliography citations in APA 7th, MLA 9th, Chicago 17th, and IEEE styles.
            </p>
          </div>
        </div>

        {/* Style Selector */}
        <div className="flex flex-wrap gap-2">
          {(['APA', 'MLA', 'Chicago', 'IEEE'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${style === s ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Author Last Name</label>
            <input
              type="text"
              value={authorLastName}
              onChange={(e) => setAuthorLastName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Author First Name</label>
            <input
              type="text"
              value={authorFirstName}
              onChange={(e) => setAuthorFirstName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-600"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Article / Book Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Journal / Book / Website Name</label>
            <input
              type="text"
              value={containerTitle}
              onChange={(e) => setContainerTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Publication Year</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> {style} Citation Result
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Citation'}
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">In-Text Citation</div>
            <div className="text-lg font-mono font-bold text-emerald-400">{citation.inText}</div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Full Bibliographic Reference</div>
            <div className="text-sm font-mono text-white leading-relaxed leading-relaxed">{citation.fullBibliographic}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
