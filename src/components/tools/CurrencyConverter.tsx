import React, { useState } from 'react';
import { Globe, ArrowRightLeft } from 'lucide-react';

const STATIC_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.78,
  CAD: 1.36,
  AUD: 1.52,
  JPY: 154.5,
  INR: 83.7,
  CNY: 7.24,
};

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const rateFromUsd = STATIC_RATES[fromCurrency] || 1;
  const rateToUsd = STATIC_RATES[toCurrency] || 1;
  const convertedAmount = (amount || 0) * (rateToUsd / rateFromUsd);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Currency Converter</h2>
            <p className="text-slate-400 text-sm">Convert between major global currencies with instant calculation.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Amount</label>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-5 gap-2 items-center">
              <div className="col-span-2">
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">From</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                >
                  {Object.keys(STATIC_RATES).map((curr) => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-1 flex justify-center pt-6">
                <button
                  onClick={handleSwap}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-400 transition-all"
                  title="Swap Currencies"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="col-span-2">
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">To</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                >
                  {Object.keys(STATIC_RATES).map((curr) => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Converted Value</span>
              <div className="my-3 text-4xl sm:text-5xl font-extrabold text-indigo-400 font-mono">
                {convertedAmount.toFixed(2)} <span className="text-sm font-medium text-slate-400">{toCurrency}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-500">
              Exchange Rate: 1 {fromCurrency} = {(rateToUsd / rateFromUsd).toFixed(4)} {toCurrency}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
