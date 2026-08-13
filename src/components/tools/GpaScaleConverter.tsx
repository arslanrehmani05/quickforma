import React, { useState, useMemo } from 'react';
import { Sparkles, GraduationCap } from 'lucide-react';

export const GpaScaleConverter: React.FC = () => {
  const [sourceGpa, setSourceGpa] = useState<number>(3.6);
  const [sourceScale, setSourceScale] = useState<4.0 | 4.33 | 5.0>(4.0);

  const result = useMemo(() => {
    const ratio = sourceGpa / sourceScale;
    const gpa4_0 = Math.round(ratio * 4.0 * 100) / 100;
    const gpa4_33 = Math.round(ratio * 4.33 * 100) / 100;
    const gpa5_0 = Math.round(ratio * 5.0 * 100) / 100;
    const pctEquivalent = Math.round(ratio * 100 * 10) / 10;

    let ectsGrade = 'F';
    if (ratio >= 0.9) ectsGrade = 'A (Excellent)';
    else if (ratio >= 0.8) ectsGrade = 'B (Very Good)';
    else if (ratio >= 0.7) ectsGrade = 'C (Good)';
    else if (ratio >= 0.6) ectsGrade = 'D (Satisfactory)';
    else if (ratio >= 0.5) ectsGrade = 'E (Sufficient)';

    return { gpa4_0, gpa4_33, gpa5_0, pctEquivalent, ectsGrade };
  }, [sourceGpa, sourceScale]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">GPA Scale Converter</h2>
            <p className="text-xs text-slate-500">
              Convert GPAs across 4.0, 4.33, 5.0, percentage, and ECTS European credit conversion scales.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Your Current GPA</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max={sourceScale}
              value={sourceGpa}
              onChange={(e) => setSourceGpa(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Current Grading Scale</label>
            <div className="flex gap-2">
              {([4.0, 4.33, 5.0] as const).map((sc) => (
                <button
                  key={sc}
                  onClick={() => setSourceScale(sc)}
                  className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all ${sourceScale === sc ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'}`}
                >
                  {sc} Scale
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Equivalent Scale Output
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">4.0 Scale</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.gpa4_0}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">4.33 Scale</div>
            <div className="text-3xl font-extrabold text-indigo-300 font-mono">{result.gpa4_33}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">5.0 Scale</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{result.gpa5_0}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Percentage Equivalent</div>
            <div className="text-3xl font-extrabold text-amber-300 font-mono">{result.pctEquivalent}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
