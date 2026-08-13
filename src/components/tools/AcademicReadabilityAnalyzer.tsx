import React, { useState, useMemo } from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import { calculateReadability } from '../../utils/formatting/textEngine';

export const AcademicReadabilityAnalyzer: React.FC = () => {
  const [inputText, setInputText] = useState<string>(
    'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles.'
  );

  const result = useMemo(() => {
    return calculateReadability(inputText);
  }, [inputText]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Academic Readability Analyzer</h2>
            <p className="text-xs text-slate-500">
              Analyze text readability scores including Flesch-Kincaid Grade Level, Flesch Reading Ease, Gunning Fog, and Coleman-Liau indexes.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Paste Academic Essay / Abstract Text</label>
          <textarea
            rows={5}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-4 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600 leading-relaxed"
          />
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Readability Scores
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Flesch-Kincaid Grade</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.fleschKincaidGrade}</div>
            <div className="text-[11px] text-indigo-300 mt-1">Grade Level</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Flesch Reading Ease</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{result.fleschReadingEase}</div>
            <div className="text-[11px] text-indigo-300 mt-1">out of 100</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Gunning Fog Index</div>
            <div className="text-3xl font-extrabold text-indigo-300 font-mono">{result.gunningFog}</div>
            <div className="text-[11px] text-indigo-300 mt-1">Complexity</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Coleman-Liau Index</div>
            <div className="text-3xl font-extrabold text-amber-300 font-mono">{result.colemanLiau}</div>
            <div className="text-[11px] text-indigo-300 mt-1">Grade Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};
