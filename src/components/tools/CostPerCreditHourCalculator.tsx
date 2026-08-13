import React, { useState, useMemo } from 'react';
import { Sparkles, DollarSign } from 'lucide-react';
import { calculateCostPerClass } from '../../utils/finance/studentFinanceEngine';

export const CostPerCreditHourCalculator: React.FC = () => {
  const [tuitionFees, setTuitionFees] = useState<number>(6500);
  const [totalCredits, setTotalCredits] = useState<number>(15);
  const [weeksInSemester, setWeeksInSemester] = useState<number>(15);
  const [sessionsPerWeek, setSessionsPerWeek] = useState<number>(3);

  const result = useMemo(() => {
    try {
      return calculateCostPerClass(tuitionFees, totalCredits, weeksInSemester, sessionsPerWeek, 3);
    } catch (err: any) {
      return { costPerCreditHour: 0, targetCourseTuition: 0, costPerClassSession: 0, financialLossPerSkippedClass: 0 };
    }
  }, [tuitionFees, totalCredits, weeksInSemester, sessionsPerWeek]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Cost Per Credit Hour Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate cost per credit hour and exact monetary value per individual class session to understand the cost of skipping class.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Total Tuition & Fees ($)</label>
            <input
              type="number"
              min="0"
              value={tuitionFees}
              onChange={(e) => setTuitionFees(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Enrolled Credit Hours</label>
            <input
              type="number"
              min="1"
              value={totalCredits}
              onChange={(e) => setTotalCredits(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Weeks in Semester</label>
            <input
              type="number"
              min="1"
              value={weeksInSemester}
              onChange={(e) => setWeeksInSemester(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Class Sessions per Week</label>
            <input
              type="number"
              min="1"
              value={sessionsPerWeek}
              onChange={(e) => setSessionsPerWeek(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Tuition & Class Session Costs
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Cost Per Credit Hour</div>
            <div className="text-3xl font-extrabold text-white font-mono">${result.costPerCreditHour}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">3-Credit Course Cost</div>
            <div className="text-3xl font-extrabold text-indigo-300 font-mono">${result.targetCourseTuition}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Cost Per Skipped Class</div>
            <div className="text-3xl font-extrabold text-rose-400 font-mono">${result.financialLossPerSkippedClass}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
