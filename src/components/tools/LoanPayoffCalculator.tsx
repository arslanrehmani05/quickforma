import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export const LoanPayoffCalculator: React.FC = () => {
  const [balance, setBalance] = useState<number>(25000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [currentPayment, setCurrentPayment] = useState<number>(450);
  const [extraPayment, setExtraPayment] = useState<number>(150);

  const monthlyRate = (interestRate || 0) / 100 / 12;
  const totalMonthlyPayment = (currentPayment || 0) + (extraPayment || 0);

  // Approximate payoff months
  let monthsWithExtra = 0;
  let currBal = balance || 0;
  while (currBal > 0 && monthsWithExtra < 600 && totalMonthlyPayment > currBal * monthlyRate) {
    const interest = currBal * monthlyRate;
    currBal = currBal + interest - totalMonthlyPayment;
    monthsWithExtra++;
  }

  const yearsSaved = Math.max(0, (60 - monthsWithExtra) / 12);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Loan Payoff & Extra Payment Calculator</h2>
            <p className="text-slate-400 text-sm">Calculate how making extra monthly payments shortens your loan payoff schedule.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Remaining Balance ($)</label>
              <input
                type="number"
                min="0"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Interest Rate (%)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Current Monthly ($)</label>
                <input
                  type="number"
                  min="0"
                  value={currentPayment}
                  onChange={(e) => setCurrentPayment(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Extra Monthly ($)</label>
                <input
                  type="number"
                  min="0"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Payoff Duration with Extra Payments</span>
              <div className="my-3 text-4xl sm:text-5xl font-extrabold text-emerald-400 font-mono">
                {Math.floor(monthsWithExtra / 12)} yrs {monthsWithExtra % 12} mos
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Total Monthly Payment:</span>
                <span className="font-mono text-slate-200">${totalMonthlyPayment.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
