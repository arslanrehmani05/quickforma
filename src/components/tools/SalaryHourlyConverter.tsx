import React, { useState } from 'react';
import { Scale } from 'lucide-react';

export const SalaryHourlyConverter: React.FC = () => {
  const [annualSalary, setAnnualSalary] = useState<number>(75000);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(52);

  const totalAnnualHours = Math.max(1, (hoursPerWeek || 1) * (weeksPerYear || 1));
  const hourlyRate = (annualSalary || 0) / totalAnnualHours;
  const weeklyPay = hourlyRate * (hoursPerWeek || 1);
  const monthlyPay = (annualSalary || 0) / 12;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Salary to Hourly Converter</h2>
            <p className="text-slate-400 text-sm">Convert annual salary into equivalent hourly, daily, weekly, and monthly rates.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Annual Salary ($)</label>
              <input
                type="number"
                min="0"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Hours / Week</label>
                <input
                  type="number"
                  min="1"
                  max="168"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Weeks / Year</label>
                <input
                  type="number"
                  min="1"
                  max="52"
                  value={weeksPerYear}
                  onChange={(e) => setWeeksPerYear(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Equivalent Hourly Rate</span>
              <div className="my-3 text-4xl sm:text-5xl font-extrabold text-indigo-400 font-mono">
                ${hourlyRate.toFixed(2)} <span className="text-sm font-medium text-slate-400">/ hr</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Weekly Pay:</span>
                <span className="font-mono text-slate-200">${weeklyPay.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Pay:</span>
                <span className="font-mono text-slate-200">${monthlyPay.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
