import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

export const SalesTaxCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(250);
  const [taxRate, setTaxRate] = useState<number>(7.5);

  const taxAmount = ((amount || 0) * (taxRate || 0)) / 100;
  const totalAmount = (amount || 0) + taxAmount;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Sales Tax Calculator</h2>
            <p className="text-slate-600 text-sm">Calculate sales tax amounts and total cost including local taxes.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Pre-Tax Amount ($)</label>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Sales Tax Rate (%)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-600 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Total Total Including Tax</span>
              <div className="my-4 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">${totalAmount.toFixed(2)}</div>
            </div>
            <div className="pt-4 border-t border-indigo-500/80 flex justify-between text-xs text-indigo-100">
              <span>Sales Tax Added:</span>
              <span className="font-bold text-white">${taxAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
