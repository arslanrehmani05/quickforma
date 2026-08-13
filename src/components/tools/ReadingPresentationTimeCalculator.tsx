import React, { useState, useMemo } from 'react';
import { Sparkles, Clock } from 'lucide-react';
import { calculateReadability } from '../../utils/formatting/textEngine';

export const ReadingPresentationTimeCalculator: React.FC = () => {
  const [wordCount, setWordCount] = useState<number>(1500);

  const result = useMemo(() => {
    const readingSlow = Math.ceil(wordCount / 180);
    const readingAvg = Math.ceil(wordCount / 225);
    const readingFast = Math.ceil(wordCount / 300);
    const speakingAvg = Math.ceil(wordCount / 130);

    return { readingSlow, readingAvg, readingFast, speakingAvg };
  }, [wordCount]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Reading & Presentation Time Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate estimated reading time (slow, average, fast) and speech presentation length from total word count.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Total Document / Speech Word Count</label>
          <input
            type="number"
            min="0"
            value={wordCount}
            onChange={(e) => setWordCount(parseFloat(e.target.value) || 0)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Time Estimates
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Avg Reading Time</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.readingAvg} min</div>
            <div className="text-[11px] text-indigo-300 mt-1">225 wpm</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Slow Reading</div>
            <div className="text-3xl font-extrabold text-indigo-300 font-mono">{result.readingSlow} min</div>
            <div className="text-[11px] text-indigo-300 mt-1">180 wpm</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Fast Reading</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{result.readingFast} min</div>
            <div className="text-[11px] text-indigo-300 mt-1">300 wpm</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Speech Presentation</div>
            <div className="text-3xl font-extrabold text-amber-300 font-mono">{result.speakingAvg} min</div>
            <div className="text-[11px] text-indigo-300 mt-1">130 wpm speaking</div>
          </div>
        </div>
      </div>
    </div>
  );
};
