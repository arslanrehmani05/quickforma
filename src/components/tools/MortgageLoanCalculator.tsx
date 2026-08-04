import React, { useState } from 'react';
import { Building } from 'lucide-react';

export const MortgageLoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(350000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);

  // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
  const monthlyRate = (interestRate || 0) / 100 / 12;
  const totalMonths = (loanTermYears || 1) * 12;

  const monthlyPayment = monthlyRate > 0 && totalMonths > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : (loanAmount || 0) / (totalMonths || 1);

  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = Math.max(0, totalPayment - (loanAmount || 0));

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Loan & Mortgage Calculator</h2>
            <p className="text-slate-400 text-sm">Calculate monthly payments, total interest paid, and full payoff amounts.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Loan Amount ($)</label>
              <input
                type="number"
                min="0"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Annual Interest Rate (%)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Loan Term (Years)</label>
              <input
                type="number"
                min="1"
                max="50"
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Monthly Payment</span>
              <div className="my-3 text-4xl sm:text-5xl font-extrabold text-indigo-400 font-mono">
                ${monthlyPayment.toFixed(2)}
              </div>
              <span className="text-xs text-slate-500">Fixed principal & interest per month</span>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Total Principal:</span>
                <span className="font-mono text-slate-300">${(loanAmount || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Interest Paid:</span>
                <span className="font-mono text-amber-400">${totalInterest.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-200 pt-2 border-t border-slate-800">
                <span>Total Cost of Loan:</span>
                <span className="font-mono text-indigo-400">${totalPayment.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
