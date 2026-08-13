import React, { useState, useMemo } from 'react';
import { Sparkles, Clock, AlertCircle } from 'lucide-react';

export const ExamAssignmentCountdown: React.FC = () => {
  const [examDate, setExamDate] = useState<string>('2026-09-01');
  const [targetStudyHours, setTargetStudyHours] = useState<number>(30);

  const result = useMemo(() => {
    const target = new Date(examDate).getTime();
    const now = new Date().getTime();
    const diffMs = target - now;

    if (isNaN(target) || diffMs <= 0) {
      return { daysLeft: 0, hoursLeft: 0, dailyHoursNeeded: 0, status: 'Passed / Today' };
    }

    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.ceil(diffMs / (1000 * 60 * 60));
    const dailyHoursNeeded = Math.round((targetStudyHours / daysLeft) * 10) / 10;

    return {
      daysLeft,
      hoursLeft,
      dailyHoursNeeded: Math.max(0.1, dailyHoursNeeded),
      status: `${daysLeft} days remaining`,
    };
  }, [examDate, targetStudyHours]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Exam & Assignment Countdown</h2>
            <p className="text-xs text-slate-500">
              Calculate days remaining until exam deadline and daily study hours required to reach target preparation hours.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Exam / Deadline Date</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Target Preparation Hours Needed</label>
            <input
              type="number"
              min="1"
              value={targetStudyHours}
              onChange={(e) => setTargetStudyHours(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Deadline Breakdown
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Days Remaining</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.daysLeft} days</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Hours Remaining</div>
            <div className="text-3xl font-extrabold text-indigo-300 font-mono">{result.hoursLeft} hrs</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Daily Prep Pacing</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{result.dailyHoursNeeded} hrs/day</div>
          </div>
        </div>
      </div>
    </div>
  );
};
