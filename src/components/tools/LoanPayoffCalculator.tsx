import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

export const LoanPayoffCalculator: React.FC = () => {
  const [balance, setBalance] = useState<number>(15000);
  const [interestRate, setInterestRate] = useState<number>(12);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(400);

  const monthlyRate = ((interestRate || 0) / 100) / 12;
  const numMonths = monthlyRate > 0 && monthlyPayment > balance * monthlyRate
    ? Math.log(monthlyPayment / (monthlyPayment - balance * monthlyRate)) / Math.log(1 + monthlyRate)
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Loan Payoff & Debt Schedule Calculator</h2>
            <p className="text-slate-600 text-sm">Calculate months required to completely pay off credit card or personal loan debt.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Current Balance ($)</label>
              <input
                type="number"
                min="0"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Annual Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Monthly Payment Amount ($)</label>
              <input
                type="number"
                min="0"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-600 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Payoff Timeline</span>
              <div className="my-4 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                {numMonths > 0 ? `${Math.ceil(numMonths)} Months` : 'Payment Too Low'}
              </div>
            </div>
            <div className="pt-4 border-t border-indigo-500/80 flex justify-between text-xs text-indigo-100">
              <span>Years to Pay Off:</span>
              <span className="font-bold text-white">{numMonths > 0 ? (numMonths / 12).toFixed(1) : 0} Yrs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
