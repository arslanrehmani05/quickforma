import React, { useState, useMemo } from 'react';
import { Sparkles, Calendar, Clock } from 'lucide-react';
import { calculateStudyHoursNeeded } from '../../utils/formatting/textEngine';

export const StudyScheduleTimeCalculator: React.FC = () => {
  const [creditHours, setCreditHours] = useState<number>(15);
  const [difficulty, setDifficulty] = useState<1 | 1.5 | 2>(1.5);

  const result = useMemo(() => {
    return calculateStudyHoursNeeded(creditHours, difficulty);
  }, [creditHours, difficulty]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Study Time & Schedule Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate recommended weekly out-of-class study hours based on course credit load and subject difficulty.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Total Semester Credit Hours</label>
            <input
              type="number"
              min="1"
              value={creditHours}
              onChange={(e) => setCreditHours(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Course Difficulty Level</label>
            <div className="flex gap-2">
              <button
                onClick={() => setDifficulty(1)}
                className={`flex-1 py-2.5 text-xs font-semibold rounded-xl ${difficulty === 1 ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'}`}
              >
                Standard (1x)
              </button>
              <button
                onClick={() => setDifficulty(1.5)}
                className={`flex-1 py-2.5 text-xs font-semibold rounded-xl ${difficulty === 1.5 ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'}`}
              >
                Moderate (1.5x)
              </button>
              <button
                onClick={() => setDifficulty(2)}
                className={`flex-1 py-2.5 text-xs font-semibold rounded-xl ${difficulty === 2 ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'}`}
              >
                Rigorous (2x)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Recommended Study Targets
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Weekly Study Time</div>
            <div className="text-4xl font-extrabold text-white font-mono">{result.totalWeeklyStudyHours} hrs/week</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Daily Study Target</div>
            <div className="text-4xl font-extrabold text-emerald-400 font-mono">{result.dailyStudyHours} hrs/day</div>
          </div>
        </div>
      </div>
    </div>
  );
};
