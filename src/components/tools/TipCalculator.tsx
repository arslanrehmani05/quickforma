import React, { useState } from 'react';
import { Calculator, Users, DollarSign, Percent } from 'lucide-react';

export const TipCalculator: React.FC = () => {
  const [bill, setBill] = useState<number>(85.00);
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [customTip, setCustomTip] = useState<string>('');
  const [people, setPeople] = useState<number>(3);
  const [roundUp, setRoundUp] = useState<boolean>(false);

  const activeTip = customTip !== '' ? (parseFloat(customTip) || 0) : tipPercent;

  const rawTipAmount = (bill * activeTip) / 100;
  const rawTotalAmount = bill + rawTipAmount;

  const totalAmount = roundUp ? Math.ceil(rawTotalAmount) : rawTotalAmount;
  const tipAmount = totalAmount - bill;
  const perPersonTotal = totalAmount / (people || 1);
  const perPersonTip = tipAmount / (people || 1);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Tip & Bill Splitter Calculator
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Instantly split restaurant bills and calculate tip per person.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Input Form */}
        <div className="md:col-span-7 space-y-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-5 shadow-sm">
            {/* Bill Amount Input */}
            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-2">
                Bill Subtotal
              </label>
              <div className="relative">
                <DollarSign className="w-5 h-5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={bill || ''}
                  onChange={(e) => setBill(parseFloat(e.target.value) || 0)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-lg font-bold text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
            </div>

            {/* Tip Percentage Buttons */}
            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-2">
                Select Tip Percentage
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {[10, 15, 18, 20, 25].map(pct => (
                  <button
                    key={pct}
                    onClick={() => {
                      setTipPercent(pct);
                      setCustomTip('');
                    }}
                    className={`py-2.5 rounded-xl border text-sm font-bold transition-all ${
                      activeTip === pct && customTip === ''
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-sm'
                        : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>

              {/* Custom Tip */}
              <div className="mt-3">
                <div className="relative">
                  <Percent className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="0"
                    placeholder="Custom %"
                    value={customTip}
                    onChange={(e) => setCustomTip(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm text-zinc-900 dark:text-white outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Number of People */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> Split Between
                </label>
                <span className="px-2.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-mono font-bold rounded-lg text-xs border border-zinc-200 dark:border-zinc-700">
                  {people} {people === 1 ? 'Person' : 'People'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={people}
                onChange={(e) => setPeople(parseInt(e.target.value) || 1)}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
              />
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="md:col-span-5 flex flex-col justify-between bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Calculation Breakdown</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-baseline p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <div>
                  <span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Tip</span>
                  <span className="text-xs text-zinc-400">({activeTip}% of ${bill.toFixed(2)})</span>
                </div>
                <span className="text-xl font-bold text-zinc-900 dark:text-white">${tipAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-baseline p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <div>
                  <span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Bill + Tip</span>
                </div>
                <span className="text-xl font-bold text-zinc-900 dark:text-white">${totalAmount.toFixed(2)}</span>
              </div>

              <hr className="border-zinc-200 dark:border-zinc-800" />

              <div className="p-4 bg-black text-white dark:bg-white dark:text-black rounded-2xl text-center space-y-1 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider block opacity-80">Total Per Person</span>
                <span className="text-3xl font-extrabold">${perPersonTotal.toFixed(2)}</span>
                <span className="text-[11px] block mt-1 opacity-70">(${perPersonTip.toFixed(2)} tip per person)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
