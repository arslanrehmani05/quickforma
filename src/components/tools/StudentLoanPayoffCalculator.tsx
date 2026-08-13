import React, { useState, useMemo } from 'react';
import { Sparkles, DollarSign } from 'lucide-react';
import { calculateStudentLoanPayoff } from '../../utils/finance/studentFinanceEngine';

export const StudentLoanPayoffCalculator: React.FC = () => {
  const [balance, setBalance] = useState<number>(32000);
  const [interestRate, setInterestRate] = useState<number>(5.8);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(350);
  const [extraPayment, setExtraPayment] = useState<number>(100);

  const result = useMemo(() => {
    try {
      return calculateStudentLoanPayoff(balance, interestRate, monthlyPayment, extraPayment);
    } catch (err: any) {
      return { monthsToPayoff: 0, totalInterestPaid: 0, monthsSavedWithExtra: 0, interestSavedWithExtra: 0 };
    }
  }, [balance, interestRate, monthlyPayment, extraPayment]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Student Loan Payoff Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate loan payoff timeline, total interest paid, and savings from extra monthly payments.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Loan Balance ($)</label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Base Monthly Payment ($)</label>
            <input
              type="number"
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Extra Monthly Payment ($)</label>
            <input
              type="number"
              value={extraPayment}
              onChange={(e) => setExtraPayment(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Loan Payoff Projection
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Time to Pay Off</div>
            <div className="text-3xl font-extrabold text-white font-mono">{Math.floor(result.monthsToPayoff / 12)}y {result.monthsToPayoff % 12}m</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Total Interest Paid</div>
            <div className="text-3xl font-extrabold text-indigo-300 font-mono">${result.totalInterestPaid}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Interest Saved with Extra</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">${result.interestSavedWithExtra}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
