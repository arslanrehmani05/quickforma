import React, { useState, useMemo } from 'react';
import { Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { convertMarksToGrade } from '../../utils/math/gradeEngine';

export const MarksPercentageConverter: React.FC = () => {
  const [marks, setMarks] = useState<number>(85);
  const [maxMarks, setMaxMarks] = useState<number>(100);

  const result = useMemo(() => {
    return convertMarksToGrade(marks, maxMarks);
  }, [marks, maxMarks]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Inputs */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Marks & Percentage Converter</h2>
            <p className="text-xs text-slate-500">
              Convert raw test/exam marks into percentages, letter grades, and 4.0 GPA points.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Marks Scored / Obtained
            </label>
            <input
              type="number"
              min="0"
              value={marks}
              onChange={(e) => setMarks(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-600 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Total / Maximum Marks
            </label>
            <input
              type="number"
              min="1"
              value={maxMarks}
              onChange={(e) => setMaxMarks(parseFloat(e.target.value) || 1)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-600 outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* Result Display */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Conversion Result
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
            Client-Side RAM Only
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Percentage Score</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
              {result.percentage}%
            </div>
            <div className="text-[11px] text-indigo-300 mt-1">
              {marks} out of {maxMarks}
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Letter Grade</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
              {result.letterGrade}
            </div>
            <div className="text-[11px] text-indigo-300 mt-1">
              Standard Academic Grading
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">4.0 GPA Equivalent</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-300 font-mono">
              {result.gpaPoint.toFixed(1)}
            </div>
            <div className="text-[11px] text-indigo-300 mt-1">
              Grade Point Equivalent
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
