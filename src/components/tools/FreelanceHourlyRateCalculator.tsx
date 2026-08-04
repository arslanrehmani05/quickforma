import React, { useState } from 'react';
import { DollarSign, Clock, HelpCircle, Copy, Check } from 'lucide-react';

export const FreelanceHourlyRateCalculator: React.FC = () => {
  const [desiredIncome, setDesiredIncome] = useState<number>(85000);
  const [expenses, setExpenses] = useState<number>(12000);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25);
  const [vacationWeeks, setVacationWeeks] = useState<number>(4);
  const [copied, setCopied] = useState(false);

  // Calculations
  const workingWeeks = Math.max(1, 52 - Math.min(51, vacationWeeks || 0));
  const totalAnnualTarget = (desiredIncome || 0) + (expenses || 0);
  const totalAnnualBillableHours = workingWeeks * (billableHoursPerWeek || 1);
  const requiredHourlyRate = totalAnnualBillableHours > 0 
    ? Math.max(0, totalAnnualTarget / totalAnnualBillableHours) 
    : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(`$${requiredHourlyRate.toFixed(2)}/hr`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Widget Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Freelance Hourly Rate Calculator</h2>
            <p className="text-slate-400 text-sm">Calculate the target hourly rate required to cover business overhead and net salary.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Desired Annual Take-Home Income ($)</label>
              <input
                type="number"
                min="0"
                value={desiredIncome}
                onChange={(e) => setDesiredIncome(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Annual Business Expenses & Taxes ($)</label>
              <input
                type="number"
                min="0"
                value={expenses}
                onChange={(e) => setExpenses(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Billable Hrs / Wk</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={billableHoursPerWeek}
                  onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Vacation Wks / Yr</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={vacationWeeks}
                  onChange={(e) => setVacationWeeks(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Results Output */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Required Target Hourly Rate</span>
              <div className="my-4 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-indigo-400 font-mono">
                  ${requiredHourlyRate.toFixed(2)}
                </span>
                <span className="text-slate-400 text-sm font-medium">/ hour</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Based on <strong className="text-slate-200">{totalAnnualBillableHours} total billable hours</strong> across {workingWeeks} working weeks per year.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-800/80 space-y-3">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Gross Target Revenue:</span>
                <span className="font-mono text-slate-200 font-semibold">${totalAnnualTarget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Day Rate (8 billable hrs):</span>
                <span className="font-mono text-slate-200 font-semibold">${(requiredHourlyRate * 8).toFixed(2)}</span>
              </div>

              <button
                onClick={handleCopy}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Rate Copied!' : 'Copy Target Hourly Rate'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SEO FAQ Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/60 space-y-6">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-400" />
          <span>Frequently Asked Questions</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-slate-200 mb-1">What is a billable hour ratio?</h4>
            <p className="text-slate-400 text-xs sm:text-sm">Freelancers rarely bill 40 hours a week. Non-billable hours include client acquisition, invoicing, administrative tasks, and learning. Most freelancers bill 20–28 hours per week.</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-200 mb-1">Why factor business expenses?</h4>
            <p className="text-slate-400 text-xs sm:text-sm">Unlike employees, freelancers pay self-employment taxes, health insurance, software subscriptions, and hardware upgrades directly out of revenue.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
