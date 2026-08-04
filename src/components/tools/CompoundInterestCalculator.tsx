import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export const CompoundInterestCalculator: React.FC = () => {
  const [initialDeposit, setInitialDeposit] = useState<number>(5000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(300);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [years, setYears] = useState<number>(10);

  // A = P(1 + r/n)^(nt) + PMT * (((1 + r/n)^(nt) - 1) / (r/n))
  const r = (interestRate || 0) / 100;
  const n = 12;
  const t = years || 1;
  const totalMonths = t * n;
  const monthlyRate = r / n;

  const compoundPrincipal = (initialDeposit || 0) * Math.pow(1 + monthlyRate, totalMonths);
  const compoundContributions = monthlyRate > 0 
    ? (monthlyContribution || 0) * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
    : (monthlyContribution || 0) * totalMonths;

  const futureValue = compoundPrincipal + compoundContributions;
  const totalPrincipalDeposited = (initialDeposit || 0) + ((monthlyContribution || 0) * totalMonths);
  const totalInterestEarned = Math.max(0, futureValue - totalPrincipalDeposited);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Compound Interest Calculator</h2>
            <p className="text-slate-400 text-sm">Calculate future investment growth with compound interest and recurring contributions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Initial Deposit ($)</label>
              <input
                type="number"
                min="0"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Monthly Contribution ($)</label>
              <input
                type="number"
                min="0"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Annual Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Duration (Years)</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Future Portfolio Value</span>
              <div className="my-3 text-4xl sm:text-5xl font-extrabold text-indigo-400 font-mono">
                ${Math.round(futureValue).toLocaleString()}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Total Principal Deposited:</span>
                <span className="font-mono text-slate-300">${Math.round(totalPrincipalDeposited).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Interest Earned:</span>
                <span className="font-mono text-emerald-400 font-bold">+${Math.round(totalInterestEarned).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
