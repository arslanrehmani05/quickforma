import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { ResetButton } from '../common/ResetButton';

export const FreelanceHourlyRateCalculator: React.FC = () => {
  const [targetSalary, setTargetSalary] = useState<number>(85000);
  const [annualExpenses, setAnnualExpenses] = useState<number>(12000);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(30);
  const [vacationWeeks, setVacationWeeks] = useState<number>(4);

  const workingWeeks = Math.max(1, 52 - Math.min(50, Math.max(0, vacationWeeks || 0)));
  const totalBillableHoursYear = (billableHoursPerWeek || 0) * workingWeeks;
  const totalRevenueNeeded = (targetSalary || 0) + (annualExpenses || 0);

  const minimumHourlyRate = totalBillableHoursYear > 0 ? totalRevenueNeeded / totalBillableHoursYear : 0;
  const suggestedRateWithBuffer = minimumHourlyRate * 1.25;

  const handleReset = () => {
    setTargetSalary(85000);
    setAnnualExpenses(12000);
    setBillableHoursPerWeek(30);
    setVacationWeeks(4);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Freelance Hourly Rate Calculator</h2>
              <p className="text-slate-600 text-sm">Calculate your minimum billable hourly rate based on income goals and expenses.</p>
            </div>
          </div>
          <ResetButton onReset={handleReset} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Target Annual Take-Home ($)</label>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={targetSalary}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setTargetSalary(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Annual Business Overhead ($)</label>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={annualExpenses}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setAnnualExpenses(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Billable Hrs / Wk</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="80"
                  value={billableHoursPerWeek}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setBillableHoursPerWeek(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
                />
              </div>
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Vacation Wks / Yr</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="50"
                  value={vacationWeeks}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setVacationWeeks(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-600 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Suggested Rate (with 25% Tax Buffer)</span>
              <div className="my-4 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                ${suggestedRateWithBuffer.toFixed(2)} <span className="text-base text-indigo-200 font-normal">/ hr</span>
              </div>
              <p className="text-indigo-100 text-xs leading-relaxed">
                Minimum break-even hourly rate: <strong className="text-white">${minimumHourlyRate.toFixed(2)}/hr</strong>
              </p>
            </div>
            <div className="pt-4 border-t border-indigo-500/80 flex justify-between text-xs text-indigo-100">
              <span>Total Billable Hours / Year:</span>
              <span className="font-bold text-white">{totalBillableHoursYear.toLocaleString()} hrs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
