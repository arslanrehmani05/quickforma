import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export const TipCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState<number>(120);
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [peopleCount, setPeopleCount] = useState<number>(3);

  const safePeople = Math.max(1, peopleCount || 1);
  const tipAmount = ((billAmount || 0) * (tipPercent || 0)) / 100;
  const totalAmount = (billAmount || 0) + tipAmount;
  const perPersonTotal = totalAmount / safePeople;
  const perPersonTip = tipAmount / safePeople;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Tip Calculator & Bill Splitter</h2>
            <p className="text-slate-600 text-sm">Calculate tip amounts and split restaurant bills per person instantly.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Total Bill Amount ($)</label>
              <input
                type="number"
                min="0"
                value={billAmount}
                onChange={(e) => setBillAmount(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Tip Percentage ({tipPercent}%)</label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[10, 15, 18, 20].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setTipPercent(pct)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${tipPercent === pct ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Split Between (People)</label>
              <input
                type="number"
                min="1"
                max="50"
                value={peopleCount}
                onChange={(e) => setPeopleCount(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-600 text-white flex flex-col justify-between shadow-md">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-200 block mb-1">Total Per Person</span>
                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">${perPersonTotal.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-indigo-500/80 space-y-2 text-xs text-indigo-100">
                <div className="flex justify-between">
                  <span>Tip Per Person:</span>
                  <span className="font-bold text-white">${perPersonTip.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Tip Amount:</span>
                  <span className="font-bold text-white">${tipAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Grand Total Bill:</span>
                  <span className="font-bold text-white">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
