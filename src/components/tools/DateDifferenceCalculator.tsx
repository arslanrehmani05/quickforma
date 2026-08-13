import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { Button } from '../ui/Button';

export const DateDifferenceCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-12-31');

  const diffTime = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = (diffDays / 7).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Date Difference & Duration Calculator</h2>
            <p className="text-slate-600 text-sm">Calculate total days, weeks, and duration between two dates.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold  mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 text-xs font-semibold  mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-600 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-bold  text-indigo-200">Total Duration</span>
              <div className="my-4 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{diffDays} Days</div>
            </div>
            <div className="pt-4 border-t border-indigo-500/80 flex justify-between text-xs text-indigo-100">
              <span>Duration in Weeks:</span>
              <span className="font-bold text-white">{diffWeeks} Weeks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
