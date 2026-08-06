import React, { useState } from 'react';
import { DollarSign, Clock, Calendar, Percent } from 'lucide-react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';
import { ToolSeoWrapper } from '../seo/ToolSeoWrapper';
import { FREELANCE_HOURLY_RATE_SEO } from '../../data/sampleToolSeoData';

export const FreelanceHourlyRateCalculator: React.FC = () => {
  const [targetSalary, setTargetSalary] = useState(80000);
  const [expenses, setExpenses] = useState(5000);
  const [taxRate, setTaxRate] = useState(25);
  const [workHoursPerWeek, setWorkHoursPerWeek] = useState(40);
  const [unbillablePercent, setUnbillablePercent] = useState(20);
  const [vacationWeeks, setVacationWeeks] = useState(4);

  // Calculations
  const workingWeeksPerYear = Math.max(1, 52 - vacationWeeks);
  const totalHoursPerYear = workingWeeksPerYear * workHoursPerWeek;
  const billableHoursPerYear = totalHoursPerYear * (1 - unbillablePercent / 100);
  
  const totalRevenueNeededPreTax = targetSalary + expenses;
  const grossRevenueNeeded = taxRate < 100 ? totalRevenueNeededPreTax / (1 - taxRate / 100) : totalRevenueNeededPreTax;
  
  const requiredHourlyRate = billableHoursPerYear > 0 ? grossRevenueNeeded / billableHoursPerYear : 0;
  const requiredDailyRate = requiredHourlyRate * (workHoursPerWeek / 5);

  const resetFields = () => {
    setTargetSalary(80000);
    setExpenses(5000);
    setTaxRate(25);
    setWorkHoursPerWeek(40);
    setUnbillablePercent(20);
    setVacationWeeks(4);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 1. INTERACTIVE TOOL WIDGET (ALWAYS FIRST) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Freelance Hourly Rate Calculator</h2>
              <p className="text-slate-600 text-sm">Calculate your minimum billable rate to achieve target income after taxes and expenses.</p>
            </div>
          </div>
          <ResetButton onReset={resetFields} label="Reset" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-1">Target Annual Take-Home ($)</label>
              <input
                type="number"
                value={targetSalary}
                onChange={(e) => setTargetSalary(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-1">Annual Business Overhead Expenses ($)</label>
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-1">Tax Buffer (%)</label>
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
                />
              </div>
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-1">Vacation (Weeks)</label>
                <input
                  type="number"
                  value={vacationWeeks}
                  onChange={(e) => setVacationWeeks(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-1">Hours / Week</label>
                <input
                  type="number"
                  value={workHoursPerWeek}
                  onChange={(e) => setWorkHoursPerWeek(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
                />
              </div>
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-1">Unbillable Admin (%)</label>
                <input
                  type="number"
                  value={unbillablePercent}
                  onChange={(e) => setUnbillablePercent(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-indigo-600 text-white shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-200 block mb-0.5">Minimum Hourly Rate</span>
                  <span className="text-3xl font-extrabold">${requiredHourlyRate.toFixed(2)}</span>
                  <span className="text-xs text-indigo-200 block mt-0.5">/ hour</span>
                </div>
                <CopyButton textToCopy={`$${requiredHourlyRate.toFixed(2)}/hr`} variant="secondary" />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase">Daily Rate</span>
                  <span className="text-slate-900 font-bold text-sm">${requiredDailyRate.toFixed(2)}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase">Gross Revenue</span>
                  <span className="text-slate-900 font-bold text-sm">${Math.round(grossRevenueNeeded).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-4">
              <div className="flex justify-between"><span>Annual Billable Hours:</span><span className="font-bold text-slate-900">{Math.round(billableHoursPerYear)} hrs</span></div>
              <div className="flex justify-between"><span>Working Weeks / Year:</span><span className="font-bold text-slate-900">{workingWeeksPerYear} weeks</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
