import React, { useState, useMemo } from 'react';
import { Sparkles, FileText } from 'lucide-react';
import { calculateEssayPages } from '../../utils/formatting/textEngine';

export const EssayPageCountCalculator: React.FC = () => {
  const [wordCount, setWordCount] = useState<number>(1250);
  const [fontSize, setFontSize] = useState<10 | 11 | 12>(12);
  const [spacing, setSpacing] = useState<'single' | '1.5' | 'double'>('double');
  const [fontFamily, setFontFamily] = useState<'Times New Roman' | 'Arial' | 'Calibri'>('Times New Roman');

  const result = useMemo(() => {
    return calculateEssayPages(wordCount, fontSize, spacing, fontFamily);
  }, [wordCount, fontSize, spacing, fontFamily]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Essay Page Count Calculator</h2>
            <p className="text-xs text-slate-500">
              Convert word count to estimated printed pages based on font size (10/11/12pt), line spacing (Single/1.5/Double), and font family.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Total Word Count</label>
            <input
              type="number"
              min="0"
              value={wordCount}
              onChange={(e) => setWordCount(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Line Spacing</label>
            <div className="flex gap-2">
              {(['single', '1.5', 'double'] as const).map((sp) => (
                <button
                  key={sp}
                  onClick={() => setSpacing(sp)}
                  className={`flex-1 py-2.5 text-xs font-semibold rounded-xl capitalize transition-all ${spacing === sp ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'}`}
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Font Size</label>
            <div className="flex gap-2">
              {([10, 11, 12] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setFontSize(sz)}
                  className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all ${fontSize === sz ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'}`}
                >
                  {sz}pt
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Font Family</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="Times New Roman">Times New Roman</option>
              <option value="Arial">Arial</option>
              <option value="Calibri">Calibri</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Printed Page Estimate
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Estimated Printed Pages</div>
            <div className="text-4xl font-extrabold text-white font-mono">{result.estimatedPages} pages</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Density Benchmark</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">~{result.wordsPerPage} words/page</div>
          </div>
        </div>
      </div>
    </div>
  );
};
