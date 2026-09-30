import React, { useState, useMemo } from 'react';
import { Sparkles, Award } from 'lucide-react';
import { convertMarksToGrade } from '../../utils/math/gradeEngine';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';
import { ModePillsBar } from '../ui/ModePillsBar';

export const MarksToGpaConverter: React.FC = () => {
  const [marks, setMarks] = useState<number>(88);
  const [totalMarks, setTotalMarks] = useState<number>(100);

  const result = useMemo(() => {
    return convertMarksToGrade(marks, totalMarks);
  }, [marks, totalMarks]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Marks to GPA Converter</h2>
            <p className="text-xs text-slate-500">
              Convert raw exam scores and marks directly into 4.0 GPA points and US letter grades.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Marks Scored</label>
            <input
              type="number"
              min="0"
              value={marks}
              onChange={(e) => setMarks(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Total Maximum Marks</label>
            <input
              type="number"
              min="1"
              value={totalMarks}
              onChange={(e) => setTotalMarks(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold  text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> GPA & Grade Conversion
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Percentage Score</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.percentage}%</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Letter Grade</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{result.letterGrade}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">4.0 GPA Equivalent</div>
            <div className="text-3xl font-extrabold text-indigo-300 font-mono">{result.gpaPoint.toFixed(1)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
