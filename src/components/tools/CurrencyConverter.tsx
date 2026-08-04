import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  const RATES: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    CAD: 1.36,
    AUD: 1.52,
    JPY: 155.4
  };

  const converted = ((amount || 0) / (RATES[from] || 1)) * (RATES[to] || 1);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <ArrowLeftRight className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Universal Currency Converter</h2>
            <p className="text-slate-600 text-sm">Convert live reference exchange rates between major global currencies.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Amount ($)</label>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">From</label>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 text-xs font-bold outline-none"
                >
                  {Object.keys(RATES).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">To</label>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 text-xs font-bold outline-none"
                >
                  {Object.keys(RATES).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-600 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Converted Amount ({to})</span>
              <div className="my-4 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{converted.toFixed(2)} {to}</div>
            </div>
            <div className="pt-4 border-t border-indigo-500/80 text-xs text-indigo-100">
              <span>1 {from} = {((1 / (RATES[from] || 1)) * (RATES[to] || 1)).toFixed(4)} {to}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
